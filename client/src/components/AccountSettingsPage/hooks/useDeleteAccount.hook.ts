import { useState, useCallback } from 'react';
import { userService } from '../../../api/services.api';

interface UseDeleteAccountState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

interface UseDeleteAccountReturn extends UseDeleteAccountState {
  deleteAccount: () => Promise<void>;
  clearState: () => void;
}

export const useDeleteAccount = (): UseDeleteAccountReturn => {
  const [state, setState] = useState<UseDeleteAccountState>({
    isLoading: false,
    error: null,
    success: false,
  });

  const deleteAccount = useCallback(async () => {
    setState({ isLoading: true, error: null, success: false });

    try {
      await userService.deleteAccount();
      setState({ isLoading: false, error: null, success: true });

      localStorage.removeItem('accessToken');

      window.location.href = '/';
    } catch (error) {
      setState({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Błąd podczas usuwania konta',
        success: false,
      });
      throw error;
    }
  }, []);

  const clearState = useCallback(() => {
    setState({ isLoading: false, error: null, success: false });
  }, []);

  return {
    ...state,
    deleteAccount,
    clearState,
  };
};
