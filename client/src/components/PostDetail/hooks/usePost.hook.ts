import { useQuery } from '@tanstack/react-query';
import { postService } from '../../../api/services.api';
import type { PostData } from '../../../api/types.api';

export interface UsePostOptions {
  enabled?: boolean;
  staleTime?: number;
}

export interface UsePostResult {
  post: PostData | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  refetch: () => void;
}

export const usePost = (
  postId: number,
  options: UsePostOptions = {}
): UsePostResult => {
  const query = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      return await postService.getById(postId);
    },
    enabled: options.enabled !== false && !!postId,
    staleTime: options.staleTime ?? 5 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error && 'status' in error && (error as any).status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });

  return {
    post: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error || null,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
  };
};
