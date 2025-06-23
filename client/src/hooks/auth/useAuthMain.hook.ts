import { useEffect, useCallback } from 'react';
import { useAuthState } from './useAuthState.hook';
import { useTokenManager } from './useTokenManager.hook';
import { useAuthActions } from './useAuthActions.hook';
import type { UseAuthReturn, AuthUser } from './types';

export const useAuthMain = (): UseAuthReturn => {
  const {
    authState,
    setUser,
    setToken,
    setAuthenticated,
    setLoading,
    setError,
    clearError,
    resetState,
  } = useAuthState();

  const handleUserLoaded = useCallback(
    (user: AuthUser) => {
      setUser(user);
      setToken(authState.token);
      setAuthenticated(true);
      setLoading(false);
    },
    [setUser, setToken, setAuthenticated, setLoading, authState.token]
  );

  const handleTokenInvalid = useCallback(() => {
    resetState();
  }, [resetState]);

  const handleTokenError = useCallback(
    (error: string) => {
      setError(error);
      resetState();
    },
    [setError, resetState]
  );

  const { checkAuthStatus, saveToken, clearToken } = useTokenManager({
    onUserLoaded: handleUserLoaded,
    onTokenInvalid: handleTokenInvalid,
    onError: handleTokenError,
  });

  const handleLoginStart = useCallback(() => {
    setLoading(true);
    setError(null);
  }, [setLoading, setError]);

  const handleLoginSuccess = useCallback(
    (user: AuthUser, token: string) => {
      saveToken(token);
      setUser(user);
      setToken(token);
      setAuthenticated(true);
      setLoading(false);
      setError(null);
    },
    [saveToken, setUser, setToken, setAuthenticated, setLoading, setError]
  );

  const handleLoginError = useCallback(
    (error: string) => {
      setLoading(false);
      setError(error);
    },
    [setLoading, setError]
  );

  const handleRegisterStart = useCallback(() => {
    setLoading(true);
    setError(null);
  }, [setLoading, setError]);

  const handleRegisterSuccess = useCallback(
    (user: AuthUser, token: string) => {
      saveToken(token);
      setUser(user);
      setToken(token);
      setAuthenticated(true);
      setLoading(false);
      setError(null);
    },
    [saveToken, setUser, setToken, setAuthenticated, setLoading, setError]
  );

  const handleRegisterError = useCallback(
    (error: string) => {
      setLoading(false);
      setError(error);
    },
    [setLoading, setError]
  );

  const handleLogout = useCallback(() => {
    clearToken();
    resetState();
  }, [clearToken, resetState]);

  const { login, register, logout } = useAuthActions({
    onLoginStart: handleLoginStart,
    onLoginSuccess: handleLoginSuccess,
    onLoginError: handleLoginError,
    onRegisterStart: handleRegisterStart,
    onRegisterSuccess: handleRegisterSuccess,
    onRegisterError: handleRegisterError,
    onLogout: handleLogout,
  });

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return {
    ...authState,
    login,
    register,
    logout,
    clearError,
    checkAuthStatus,
  };
};
