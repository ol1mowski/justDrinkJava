import { useCallback, useEffect } from 'react';
import {
  isTokenExpired,
  getTokenFromStorage,
  setTokenToStorage,
  removeTokenFromStorage,
} from '../../utils/jwt';
import { userService } from '../../utils/api';
import type { AuthUser } from './types';

export interface UseTokenManagerOptions {
  onUserLoaded: (user: AuthUser) => void;
  onTokenInvalid: () => void;
  onError: (error: string) => void;
}

export interface UseTokenManagerReturn {
  checkAuthStatus: () => Promise<void>;
  saveToken: (token: string) => void;
  clearToken: () => void;
}

export const useTokenManager = (
  options: UseTokenManagerOptions
): UseTokenManagerReturn => {
  const { onUserLoaded, onTokenInvalid, onError } = options;

  const checkAuthStatus = useCallback(async () => {
    try {
      const token = getTokenFromStorage();

      if (token && !isTokenExpired(token)) {
        try {
          const userData = await userService.getCurrent();

          const authUser: AuthUser = {
            id: userData.id,
            email: userData.email,
            username: userData.username,
            createdAt: userData.createdAt,
          };

          onUserLoaded(authUser);
        } catch (error) {
          console.error('❌ Błąd pobierania danych użytkownika:', error);
          removeTokenFromStorage();
          onTokenInvalid();
        }
      } else {
        if (token) {
          removeTokenFromStorage();
        }
        onTokenInvalid();
      }
    } catch (error) {
      console.error('❌ Błąd sprawdzania stanu logowania:', error);
      removeTokenFromStorage();
      onError('Błąd sprawdzania stanu logowania');
    }
  }, [onUserLoaded, onTokenInvalid, onError]);

  const saveToken = useCallback((token: string) => {
    setTokenToStorage(token);
  }, []);

  const clearToken = useCallback(() => {
    removeTokenFromStorage();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [checkAuthStatus]);

  return {
    checkAuthStatus,
    saveToken,
    clearToken,
  };
};
