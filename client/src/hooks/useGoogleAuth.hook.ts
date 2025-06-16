import { useCallback, useRef } from 'react'

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleAuthConfig) => void
          renderButton: (element: HTMLElement, config: GoogleButtonConfig) => void
          prompt: () => void
          cancel: () => void
        }
      }
    }
  }
}

interface GoogleAuthConfig {
  client_id: string
  callback: (response: CredentialResponse) => void
  auto_select?: boolean
  cancel_on_tap_outside?: boolean
}

interface GoogleButtonConfig {
  theme?: 'outline' | 'filled_blue' | 'filled_black'
  size?: 'large' | 'medium' | 'small'
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
  shape?: 'rectangular' | 'pill' | 'circle' | 'square'
  logo_alignment?: 'left' | 'center'
  width?: string
  locale?: string
}

interface CredentialResponse {
  credential: string
  select_by: string
}

export interface GoogleUser {
  id: string
  email: string
  name: string
  picture: string
  given_name: string
  family_name: string
}

interface UseGoogleAuthOptions {
  onSuccess: (user: GoogleUser, token: string) => Promise<void>
  onError: (error: string) => void
  clientId?: string
}

export const useGoogleAuth = ({ onSuccess, onError, clientId }: UseGoogleAuthOptions) => {
  const buttonRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  const decodeJWT = useCallback((token: string): GoogleUser | null => {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      
      const payload = JSON.parse(jsonPayload)
      
      return {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        given_name: payload.given_name,
        family_name: payload.family_name
      }
    } catch (error) {
      console.error('Błąd dekodowania JWT:', error)
      return null
    }
  }, [])

  const handleCredentialResponse = useCallback(async (response: CredentialResponse) => {
    try {
      const user = decodeJWT(response.credential)
      if (!user) {
        onError('Błąd podczas dekodowania danych użytkownika')
        return
      }

      await onSuccess(user, response.credential)
    } catch (error) {
      console.error('Błąd logowania Google:', error)
      onError('Wystąpił błąd podczas logowania przez Google')
    }
  }, [decodeJWT, onSuccess, onError])

  const initializeGoogleAuth = useCallback(() => {
    if (!window.google || isInitialized.current) return

    const googleClientId = clientId || import.meta.env.VITE_GOOGLE_CLIENT_ID

    if (!googleClientId) {
      onError('Google Client ID nie jest skonfigurowane. Dodaj VITE_GOOGLE_CLIENT_ID do pliku .env')
      return
    }

    try {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      })

      isInitialized.current = true
    } catch (error) {
      console.error('Błąd inicjalizacji Google OAuth:', error)
      onError('Błąd inicjalizacji Google OAuth')
    }
  }, [clientId, handleCredentialResponse, onError])

  const renderGoogleButton = useCallback((config?: GoogleButtonConfig) => {
    if (!buttonRef.current || !window.google || !isInitialized.current) return

    const defaultConfig: GoogleButtonConfig = {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      shape: 'rectangular',
      logo_alignment: 'left',
      width: '100%',
      locale: 'pl'
    }

    try {
      window.google.accounts.id.renderButton(buttonRef.current, {
        ...defaultConfig,
        ...config
      })
    } catch (error) {
      console.error('Błąd renderowania przycisku Google:', error)
      onError('Błąd renderowania przycisku Google')
    }
  }, [onError])

  const promptGoogleOneTap = useCallback(() => {
    if (!window.google || !isInitialized.current) return

    try {
      window.google.accounts.id.prompt()
    } catch (error) {
      console.error('Błąd One Tap:', error)
    }
  }, [])
  
  const cancelGoogleOneTap = useCallback(() => {
    if (!window.google) return

    try {
      window.google.accounts.id.cancel()
    } catch (error) {
      console.error('Błąd anulowania One Tap:', error)
    }
  }, [])

  return {
    buttonRef,
    initializeGoogleAuth,
    renderGoogleButton,
    promptGoogleOneTap,
    cancelGoogleOneTap,
    isGoogleLoaded: () => !!window.google
  }
} 