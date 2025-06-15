import { useState, useCallback, useEffect } from 'react'
import { authApi, type AuthResponse, type LoginRequest, type RegisterRequest } from '../utils/api'

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
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

  // Initialize auth state from localStorage
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
        console.log('✅ User authenticated from localStorage:', user.email)
      } catch (error) {
        console.error('❌ Failed to parse user from localStorage:', error)
        // Clear invalid data
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
      }
    }
  }, [])

  const login = useCallback(async (credentials: LoginRequest) => {
    console.log('🔐 Starting login process for:', credentials.email)
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await authApi.login(credentials)

      if (response.status === 'success' && response.data) {
        const { token, user } = response.data
        
        // Store in localStorage
        localStorage.setItem('accessToken', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
        
        console.log('✅ Login successful for user:', user.email)
        return { success: true }
      } else {
        const errorMessage = response.message || 'Login failed'
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        
        console.log('❌ Login failed:', errorMessage)
        return { success: false, error: errorMessage, errors: response.errors }
      }
    } catch (error) {
      const errorMessage = 'Błąd połączenia z serwerem'
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      
      console.error('💥 Login error:', error)
      return { success: false, error: errorMessage }
    }
  }, [])

  const register = useCallback(async (userData: RegisterRequest) => {
    console.log('📝 Starting registration process for:', userData.email)
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await authApi.register(userData)

      if (response.status === 'success' && response.data) {
        const { token, user } = response.data
        
        // Store in localStorage
        localStorage.setItem('accessToken', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
        
        console.log('✅ Registration successful for user:', user.email)
        return { success: true }
      } else {
        const errorMessage = response.message || 'Registration failed'
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        
        console.log('❌ Registration failed:', errorMessage)
        return { success: false, error: errorMessage, errors: response.errors }
      }
    } catch (error) {
      const errorMessage = 'Błąd połączenia z serwerem'
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      
      console.error('💥 Registration error:', error)
      return { success: false, error: errorMessage }
    }
  }, [])

  const logout = useCallback(() => {
    console.log('👋 Logging out user:', authState.user?.email)
    authApi.logout()
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  }, [authState.user?.email])

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