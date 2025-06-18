import { useAuthMain } from './auth/useAuthMain.hook'
import type { UseAuthReturn } from './auth/types'

export const useAuth = (): UseAuthReturn => {
  return useAuthMain()
}

export type { AuthUser, UseAuthReturn } from './auth/types' 