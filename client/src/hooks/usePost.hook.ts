import { useQuery } from '@tanstack/react-query'
import { apiService } from '../utils/api'
import type { PostData } from '../utils/api'

export interface UsePostOptions {
  enabled?: boolean
  staleTime?: number
}

export interface UsePostResult {
  post: PostData | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  isSuccess: boolean
  refetch: () => void
}


export const usePost = (
  postId: number,
  options: UsePostOptions = {}
): UsePostResult => {
  const query = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      return await apiService.getPostById(postId)
    },
    enabled: options.enabled !== false && !!postId,
    staleTime: options.staleTime ?? 5 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error && 'status' in error && (error as any).status === 404) {
        return false
      }
      return failureCount < 3
    }
  })

  return {
    post: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error || null,
    isSuccess: query.isSuccess,
    refetch: query.refetch
  }
} 