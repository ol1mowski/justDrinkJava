import { useState, useCallback, useEffect } from 'react';
import { AuthService } from '../../../utils/api.service';
import type { AuthState, LoginFormData, RegisterFormData, ApiError } from '../types/auth.types';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = AuthService.getStoredToken();
    const user = AuthService.getStoredUser();
    
    if (token && user) {
      setAuthState(prev => ({
        ...prev,
        user,
        token,
        isAuthenticated: true,
      }));
    }
  }, []);

  const login = useCallback(async (data: LoginFormData) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await AuthService.login(data);
      AuthService.storeAuthData(response);
      
      setAuthState(prev => ({
        ...prev,
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }));
      
      console.log('User logged in successfully:', response.user.email);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: apiError.message,
      }));
      console.error('Login failed:', apiError.message);
      throw error;
    }
  }, []);

  const register = useCallback(async (data: RegisterFormData) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await AuthService.register(data);
      AuthService.storeAuthData(response);
      
      setAuthState(prev => ({
        ...prev,
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }));
      
      console.log('User registered successfully:', response.user.email);
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: apiError.message,
      }));
      console.error('Registration failed:', apiError.message);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
    clearError,
  };
}; 