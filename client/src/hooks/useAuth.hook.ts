import { useState, useCallback, useEffect } from 'react'
import { authApi, userService, type LoginRequest, type RegisterRequest } from '../utils/api'
import { 
  getUserFromToken, 
  isTokenExpired, 
  getTokenFromStorage, 
  setTokenToStorage, 
  removeTokenFromStorage 
} from '../utils/jwt'

export interface AuthUser {
  id: string | number
  email: string
  username: string
  name?: string
  avatar?: string
  createdAt: string
  oauth?: {
    provider: string
    authorized: boolean
    code: string
    timestamp: string
  }
}

interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface UseAuthReturn {
  isAuthenticated: boolean
  user: AuthUser | null
  isLoading: boolean
  error: string | null
  login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string; errors?: Record<string, string> }>
  register: (userData: RegisterRequest) => Promise<{ success: boolean; error?: string; errors?: Record<string, string> }>
  logout: () => void
  clearError: () => void
  checkAuthStatus: () => void
}

export const useAuth = (): UseAuthReturn => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })

  const checkAuthStatus = useCallback(async () => {
    try {
      const token = getTokenFromStorage()

      if (token && !isTokenExpired(token)) {
        try {
          // Pobierz pełne dane użytkownika z API
          const userData = await userService.getCurrent()
          
          const authUser: AuthUser = {
            id: userData.id,
            email: userData.email,
            username: userData.username,
            createdAt: userData.createdAt
          }
          
          setAuthState(prev => ({
            ...prev,
            user: authUser,
            token,
            isAuthenticated: true,
            isLoading: false
          }))
          console.log('👤 Użytkownik zalogowany:', authUser.username, 'ID:', authUser.id)
        } catch (error) {
          console.error('❌ Błąd pobierania danych użytkownika:', error)
          // Token może być nieprawidłowy, usuń go
          removeTokenFromStorage()
          setAuthState(prev => ({
            ...prev,
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false
          }))
        }
      } else {
        if (token) {
          removeTokenFromStorage() // Usuń wygasły token
        }
        setAuthState(prev => ({
          ...prev,
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        }))
        console.log('👤 Użytkownik niezalogowany')
      }
    } catch (error) {
      console.error('❌ Błąd sprawdzania stanu logowania:', error)
      removeTokenFromStorage()
      setAuthState(prev => ({
        ...prev,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      }))
    }
  }, [])

  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  const login = useCallback(async (credentials: LoginRequest) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await authApi.login(credentials)

      if (response.status === 'success' && response.data) {
        const { token, user } = response.data
        
        setTokenToStorage(token)
        
        // Dane użytkownika z tokenu
        const userFromToken = getUserFromToken(token)
        const authUser: AuthUser = {
          id: user.id,
          email: userFromToken?.email || user.email,
          username: userFromToken?.username || user.username,
          createdAt: user.createdAt
        }
        
        setAuthState({
          user: authUser,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
        
        return { success: true }
      } else {
        const errorMessage = response.message || 'Login failed'
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        
        return { success: false, error: errorMessage, errors: response.errors }
      }
    } catch (error) {
      const errorMessage = 'Błąd połączenia z serwerem'
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      
      return { success: false, error: errorMessage }
    }
  }, [])

  const register = useCallback(async (userData: RegisterRequest) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await authApi.register(userData)

      if (response.status === 'success' && response.data) {
        const { token, user } = response.data
            
        setTokenToStorage(token)
        
        // Dane użytkownika z tokenu
        const userFromToken = getUserFromToken(token)
        const authUser: AuthUser = {
          id: user.id,
          email: userFromToken?.email || user.email,
          username: userFromToken?.username || user.username,
          createdAt: user.createdAt
        }
        
        setAuthState({
          user: authUser,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
        
        return { success: true }
      } else {
        const errorMessage = response.message || 'Registration failed'
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        
        return { success: false, error: errorMessage, errors: response.errors }
      }
    } catch (error) {
      const errorMessage = 'Błąd połączenia z serwerem'
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      
      return { success: false, error: errorMessage }
    }
  }, [])

  const logout = useCallback(() => {
    removeTokenFromStorage()
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  }, [])

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }))
  }, [])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken') {
        checkAuthStatus()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [checkAuthStatus])

  return {
    ...authState,
    login,
    register,
    logout,
    clearError,
    checkAuthStatus
  }
} 