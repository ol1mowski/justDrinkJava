import { useState, useEffect, useCallback } from 'react'
import { apiService } from '../../../utils/api'
import type { UserData, UpdateProfileRequest, UpdateProfileResponse } from '../../../utils/api'

interface UseUserProfileState {
  user: UserData | null
  isLoading: boolean
  error: string | null
}

interface UseUserProfileReturn extends UseUserProfileState {
  updateProfile: (request: UpdateProfileRequest) => Promise<void>
  refetch: () => void
}

export const useUserProfile = (): UseUserProfileReturn => {
  const [state, setState] = useState<UseUserProfileState>({
    user: null,
    isLoading: true,
    error: null
  })

  const fetchUser = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const userData = await apiService.getCurrentUser()
      setState(prev => ({
        ...prev,
        user: userData,
        isLoading: false
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Błąd podczas pobierania danych użytkownika',
        isLoading: false
      }))
    }
  }, [])

  const updateProfile = useCallback(async (request: UpdateProfileRequest) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response: UpdateProfileResponse = await apiService.updateProfile(request)
      
      if (response.newToken) {
        localStorage.setItem('accessToken', response.newToken)
        console.log('🔄 Token zaktualizowany po zmianie nazwy użytkownika')
      }
      
      setState(prev => ({
        ...prev,
        user: response.user,
        isLoading: false
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Błąd podczas aktualizacji profilu',
        isLoading: false
      }))
      throw error
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return {
    ...state,
    updateProfile,
    refetch: fetchUser
  }
} 