import {
  useCurrentUser,
  useUpdateProfile,
} from '../../../hooks/useCurrentUser.hook';
import type { UpdateProfileRequest } from '../../../utils/api';

interface UseUserProfileReturn {
  user: any;
  isLoading: boolean;
  error: string | null;
  updateProfile: (request: UpdateProfileRequest) => Promise<void>;
  refetch: () => void;
}

export const useUserProfile = (): UseUserProfileReturn => {
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
    refetch,
  } = useCurrentUser();

  const {
    mutate: updateProfileMutation,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateProfile();

  const updateProfile = async (
    request: UpdateProfileRequest
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      updateProfileMutation(request, {
        onSuccess: () => {
          resolve();
        },
        onError: error => {
          console.error('❌ Błąd podczas aktualizacji profilu:', error);
          reject(error);
        },
      });
    });
  };

  const combinedError = userError?.message || updateError?.message || null;
  const combinedLoading = isUserLoading || isUpdating;

  return {
    user: user || null,
    isLoading: combinedLoading,
    error: combinedError,
    updateProfile,
    refetch,
  };
};
