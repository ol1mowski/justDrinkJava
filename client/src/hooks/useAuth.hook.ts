import { useState, useCallback, useEffect } from 'react'
import { authApi, type LoginRequest, type RegisterRequest } from '../utils/api'

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

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const userStr = localStorage.getItem('user')
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as AuthUser
        setAuthState(prev => ({
          ...prev,
          user,
          token,
          isAuthenticated: true,
        }))
      } catch (error) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
      }
    }
  }, [])

  const login = useCallback(async (credentials: LoginRequest) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await authApi.login(credentials)

      if (response.status === 'success' && response.data) {
        const { token, user } = response.data
        
        localStorage.setItem('accessToken', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        setAuthState({
          user,
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
            
        localStorage.setItem('accessToken', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        setAuthState({
          user,
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
    authApi.logout()
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

  const checkAuthStatus = useCallback(() => {
    try {
      const token = localStorage.getItem('accessToken')
      const userData = localStorage.getItem('user')

      if (token && userData) {
        const parsedUser = JSON.parse(userData) as AuthUser
        setAuthState(prev => ({
          ...prev,
          user: parsedUser,
          isAuthenticated: true,
        }))
        console.log('👤 Użytkownik zalogowany:', parsedUser.username)
      } else {
        setAuthState(prev => ({
          ...prev,
          user: null,
          isAuthenticated: false,
        }))
        console.log('👤 Użytkownik niezalogowany')
      }
    } catch (error) {
      console.error('❌ Błąd sprawdzania stanu logowania:', error)
      setAuthState(prev => ({
        ...prev,
        user: null,
        isAuthenticated: false,
      }))
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }
  }, [])

  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken' || e.key === 'user') {
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