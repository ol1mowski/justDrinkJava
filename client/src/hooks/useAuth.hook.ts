import { useState, useCallback, useEffect } from 'react'
import { authApi, type LoginRequest, type RegisterRequest } from '../utils/api'

interface User {
  id: number
  email: string
  username: string
  createdAt: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  })

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const userStr = localStorage.getItem('user')
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
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

  return {
    ...authState,
    login,
    register,
    logout,
    clearError,
  }
} 