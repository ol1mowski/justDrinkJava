import { useAuthMain } from './useAuthMain.hook';
import type { UseAuthReturn } from './types';

export const useAuth = (): UseAuthReturn => {
  return useAuthMain();
};

export type { AuthUser, AuthState, UseAuthReturn } from './types';
