import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../utils/api';
import type {
  UserData,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '../utils/api';
import { getTokenFromStorage, isTokenExpired } from '../utils/jwt';

export const USER_QUERY_KEY = ['currentUser'] as const;

export const useCurrentUser = () => {
  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async (): Promise<UserData> => {
      const token = getTokenFromStorage();
      if (!token || isTokenExpired(token)) {
        throw new Error('Brak ważnego tokenu');
      }
      return apiService.getCurrentUser();
    },
    enabled: (() => {
      const token = getTokenFromStorage();
      return !!token && !isTokenExpired(token);
    })(),
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.message?.includes('403') || error?.message?.includes('401')) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      request: UpdateProfileRequest
    ): Promise<UpdateProfileResponse> => {
      return apiService.updateProfile(request);
    },
    onSuccess: (data: UpdateProfileResponse) => {
      queryClient.setQueryData(USER_QUERY_KEY, data.user);

      if (data.newToken) {
        localStorage.setItem('accessToken', data.newToken);
        console.log('🔄 Token zaktualizowany po zmianie nazwy użytkownika');
      }

      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
    onError: error => {
      console.error('❌ Błąd podczas aktualizacji profilu:', error);
    },
  });
};

export const useIsAuthenticated = () => {
  const { data: user, isLoading, error } = useCurrentUser();

  return {
    isAuthenticated: !!user && !error,
    isLoading,
    user,
  };
};
