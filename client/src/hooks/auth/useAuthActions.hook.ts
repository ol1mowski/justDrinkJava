import { useCallback } from 'react';
import { authApi } from '../../utils/api';
import { getUserFromToken } from '../../utils/jwt';
import type { LoginRequest, RegisterRequest, AuthUser } from './types';

export interface UseAuthActionsOptions {
  onLoginStart: () => void;
  onLoginSuccess: (user: AuthUser, token: string) => void;
  onLoginError: (error: string) => void;
  onRegisterStart: () => void;
  onRegisterSuccess: (user: AuthUser, token: string) => void;
  onRegisterError: (error: string) => void;
  onLogout: () => void;
}

export interface UseAuthActionsReturn {
  login: (credentials: LoginRequest) => Promise<{
    success: boolean;
    error?: string;
    errors?: Record<string, string>;
  }>;
  register: (userData: RegisterRequest) => Promise<{
    success: boolean;
    error?: string;
    errors?: Record<string, string>;
  }>;
  logout: () => void;
}

export const useAuthActions = (
  options: UseAuthActionsOptions
): UseAuthActionsReturn => {
  const {
    onLoginStart,
    onLoginSuccess,
    onLoginError,
    onRegisterStart,
    onRegisterSuccess,
    onRegisterError,
    onLogout,
  } = options;

  const login = useCallback(
    async (credentials: LoginRequest) => {
      onLoginStart();

      try {
        const response = await authApi.login(credentials);

        if (response.status === 'success' && response.data) {
          const { token, user } = response.data;

          const userFromToken = getUserFromToken(token);
          const authUser: AuthUser = {
            id: user.id,
            email: userFromToken?.email || user.email,
            username: userFromToken?.username || user.username,
            createdAt: user.createdAt,
          };

          onLoginSuccess(authUser, token);
          return { success: true };
        } else {
          const errorMessage = response.message || 'Login failed';
          onLoginError(errorMessage);
          return {
            success: false,
            error: errorMessage,
            errors: response.errors,
          };
        }
      } catch (error) {
        const errorMessage = 'Błąd połączenia z serwerem';
        onLoginError(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    [onLoginStart, onLoginSuccess, onLoginError]
  );

  const register = useCallback(
    async (userData: RegisterRequest) => {
      onRegisterStart();

      try {
        const response = await authApi.register(userData);

        if (response.status === 'success' && response.data) {
          const { token, user } = response.data;

          const userFromToken = getUserFromToken(token);
          const authUser: AuthUser = {
            id: user.id,
            email: userFromToken?.email || user.email,
            username: userFromToken?.username || user.username,
            createdAt: user.createdAt,
          };

          onRegisterSuccess(authUser, token);
          return { success: true };
        } else {
          const errorMessage = response.message || 'Registration failed';
          onRegisterError(errorMessage);
          return {
            success: false,
            error: errorMessage,
            errors: response.errors,
          };
        }
      } catch (error) {
        const errorMessage = 'Błąd połączenia z serwerem';
        onRegisterError(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    [onRegisterStart, onRegisterSuccess, onRegisterError]
  );

  const handleLogout = useCallback(() => {
    onLogout();
  }, [onLogout]);

  return {
    login,
    register,
    logout: handleLogout,
  };
};
