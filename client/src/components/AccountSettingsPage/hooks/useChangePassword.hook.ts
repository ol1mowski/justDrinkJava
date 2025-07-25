import { useState, useCallback } from 'react';
import { userService } from '../../../api/services.api';
import type { ChangePasswordRequest } from '../../../api/types.api';

interface UseChangePasswordState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

interface UseChangePasswordReturn extends UseChangePasswordState {
  changePassword: (request: ChangePasswordRequest) => Promise<void>;
  clearState: () => void;
}

export const useChangePassword = (): UseChangePasswordReturn => {
  const [state, setState] = useState<UseChangePasswordState>({
    isLoading: false,
    error: null,
    success: false,
  });

  const changePassword = useCallback(async (request: ChangePasswordRequest) => {
    setState({ isLoading: true, error: null, success: false });

    try {
      await userService.changePassword(request);
      setState({ isLoading: false, error: null, success: true });
    } catch (error) {
      setState({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Błąd podczas zmiany hasła',
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
    changePassword,
    clearState,
  };
};
