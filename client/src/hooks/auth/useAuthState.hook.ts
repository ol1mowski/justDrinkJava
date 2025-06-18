import { useState, useCallback } from 'react'
import type { AuthState, AuthUser } from './types'

export interface UseAuthStateReturn {
  authState: AuthState
  setUser: (user: AuthUser | null) => void
  setToken: (token: string | null) => void
  setAuthenticated: (isAuthenticated: boolean) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  resetState: () => void
}

export const useAuthState = (): UseAuthStateReturn => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })

  const setUser = useCallback((user: AuthUser | null) => {
    setAuthState(prev => ({ ...prev, user }))
  }, [])

  const setToken = useCallback((token: string | null) => {
    setAuthState(prev => ({ ...prev, token }))
  }, [])

  const setAuthenticated = useCallback((isAuthenticated: boolean) => {
    setAuthState(prev => ({ ...prev, isAuthenticated }))
  }, [])

  const setLoading = useCallback((isLoading: boolean) => {
    setAuthState(prev => ({ ...prev, isLoading }))
  }, [])

  const setError = useCallback((error: string | null) => {
    setAuthState(prev => ({ ...prev, error }))
  }, [])

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }))
  }, [])

  const resetState = useCallback(() => {
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  }, [])

  return {
    authState,
    setUser,
    setToken,
    setAuthenticated,
    setLoading,
    setError,
    clearError,
    resetState
  }
} 