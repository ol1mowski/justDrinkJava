import { useState, useCallback } from "react";
import { apiService } from "../../../utils/api";
import type { DeleteAccountRequest } from "../../../utils/api";

interface UseDeleteAccountState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

interface UseDeleteAccountReturn extends UseDeleteAccountState {
  deleteAccount: (request: DeleteAccountRequest) => Promise<void>;
  clearState: () => void;
}

export const useDeleteAccount = (): UseDeleteAccountReturn => {
  const [state, setState] = useState<UseDeleteAccountState>({
    isLoading: false,
    error: null,
    success: false,
  });

  const deleteAccount = useCallback(async (request: DeleteAccountRequest) => {
    setState({ isLoading: true, error: null, success: false });

    try {
      await apiService.deleteAccount(request);
      setState({ isLoading: false, error: null, success: true });

      localStorage.removeItem("accessToken");

      window.location.href = "/";
    } catch (error) {
      setState({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Błąd podczas usuwania konta",
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
