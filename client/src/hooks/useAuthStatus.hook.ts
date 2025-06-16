import { useState, useEffect, useCallback } from 'react'

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

interface UseAuthStatusReturn {
  isAuthenticated: boolean
  user: AuthUser | null
  isLoading: boolean
  checkAuthStatus: () => void
}

export const useAuthStatus = (): UseAuthStatusReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuthStatus = useCallback(() => {
    try {
      const token = localStorage.getItem('accessToken')
      const userData = localStorage.getItem('user')

      if (token && userData) {
        const parsedUser = JSON.parse(userData) as AuthUser
        setUser(parsedUser)
        setIsAuthenticated(true)
        console.log('👤 Użytkownik zalogowany:', parsedUser.username)
      } else {
        setUser(null)
        setIsAuthenticated(false)
        console.log('👤 Użytkownik niezalogowany')
      }
    } catch (error) {
      console.error('❌ Błąd sprawdzania stanu logowania:', error)
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
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
    isAuthenticated,
    user,
    isLoading,
    checkAuthStatus
  }
} 