import { useState, useCallback } from 'react';
import { postService } from '../../../api/services.api';
import { useAuth } from '../../../hooks/auth/useAuth.hook';

export interface UsePostLikeResult {
  isLoading: boolean;
  error: string | null;
  toggleLike: (
    postId: number
  ) => Promise<{ likes: number; isLikedByCurrentUser: boolean } | null>;
  clearError: () => void;
}

export const usePostLike = (): UsePostLikeResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const toggleLike = useCallback(
    async (postId: number) => {
      if (!isAuthenticated) {
        setError('Musisz być zalogowany aby polajkować post');
        return null;
      }

      setIsLoading(true);
      clearError();

      try {
        const updatedPost = await postService.toggleLike(postId);

        return {
          likes: updatedPost.likes,
          isLikedByCurrentUser: updatedPost.isLikedByCurrentUser || false,
        };
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Wystąpił błąd podczas aktualizacji like';
        setError(errorMessage);
        console.error('Błąd podczas toggle like posta:', err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, clearError]
  );

  return {
    isLoading,
    error,
    toggleLike,
    clearError,
  };
};
