import { useState, useCallback } from 'react';
import { authApi } from '../../../utils/api';
import type { GoogleUser } from '../../../hooks/useGoogleAuth.hook';
import type { AuthResponse } from '../../../utils/api';

interface UseAuthWithGoogleReturn {
  isLoading: boolean;
  error: string | null;
  handleGoogleLogin: (user: GoogleUser, token: string) => Promise<void>;
  clearError: () => void;
}

export const useAuthWithGoogle = (): UseAuthWithGoogleReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleGoogleLogin = useCallback(
    async (user: GoogleUser, token: string) => {
      setIsLoading(true);
      setError(null);

      try {
        console.log('🔑 Logowanie Google dla:', user.email);
        const response = await authApi.googleAuth({ credential: token });

        if (response.status === 'success' && response.data) {
          const authData: AuthResponse = response.data;

          localStorage.setItem('accessToken', authData.token);
          window.location.href = '/';
        } else {
          throw new Error(
            response.message || 'Błąd podczas logowania przez Google'
          );
        }
      } catch (err) {
        console.error('❌ Błąd logowania Google:', err);

        let errorMessage = 'Wystąpił błąd podczas logowania przez Google';

        if (err instanceof Error) {
          errorMessage = err.message;
        }

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    handleGoogleLogin,
    clearError,
  };
};
