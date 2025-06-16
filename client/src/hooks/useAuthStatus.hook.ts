import { useState, useEffect, useCallback } from 'react'
import { 
  getUserFromToken, 
  isTokenExpired, 
  getTokenFromStorage, 
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
      const token = getTokenFromStorage()

      if (token && !isTokenExpired(token)) {
        const userFromToken = getUserFromToken(token)
        
        if (userFromToken) {
          const authUser: AuthUser = {
            id: '',
            email: userFromToken.email,
            username: userFromToken.username,
            createdAt: ''
          }
          
          setUser(authUser)
          setIsAuthenticated(true)
          console.log('👤 Użytkownik zalogowany:', authUser.username)
        } else {
          removeTokenFromStorage()
          setUser(null)
          setIsAuthenticated(false)
        }
      } else {
        if (token) {
          removeTokenFromStorage() // Usuń wygasły token
        }
        setUser(null)
        setIsAuthenticated(false)
        console.log('👤 Użytkownik niezalogowany')
      }
    } catch (error) {
      console.error('❌ Błąd sprawdzania stanu logowania:', error)
      removeTokenFromStorage()
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
      if (e.key === 'accessToken') {
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