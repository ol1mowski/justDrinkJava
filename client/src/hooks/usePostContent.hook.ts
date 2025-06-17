import { useQuery } from '@tanstack/react-query'
import { postContentApi, PostContentApiError } from '../api/postContent.api'
import type { PostContentResponse } from '../api/postContent.api'

export interface UsePostContentOptions {
  enabled?: boolean
  staleTime?: number
  refetchOnMount?: boolean
}

export interface UsePostContentResult {
  content: PostContentResponse | undefined
  isLoading: boolean
  isError: boolean
  error: PostContentApiError | Error | null
  isSuccess: boolean
  refetch: () => void
}

export const usePostContent = (
  contentId: number,
  options: UsePostContentOptions = {}
): UsePostContentResult => {
  const query = useQuery({
    queryKey: ['postContent', contentId],
    queryFn: () => postContentApi.getById(contentId),
    enabled: options.enabled !== false && !!contentId,
    staleTime: options.staleTime ?? 5 * 60 * 1000,
    refetchOnMount: options.refetchOnMount ?? true,
    retry: (failureCount, error) => {
      if (error instanceof PostContentApiError && error.status === 404) {
        return false
      }
      return failureCount < 3
    }
  })

  return {
    content: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error || null,
    isSuccess: query.isSuccess,
    refetch: query.refetch
  }
}

export const usePostContentByPostId = (
  postId: number,
  options: UsePostContentOptions = {}
): UsePostContentResult => {
  const query = useQuery({
    queryKey: ['postContentByPostId', postId],
    queryFn: () => postContentApi.getByPostId(postId),
    enabled: options.enabled !== false && !!postId,
    staleTime: options.staleTime ?? 5 * 60 * 1000,
    refetchOnMount: options.refetchOnMount ?? true,
    retry: (failureCount, error) => {
      if (error instanceof PostContentApiError && error.status === 404) {
        return false
      }
      return failureCount < 3
    }
  })

  return {
    content: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error || null,
    isSuccess: query.isSuccess,
    refetch: query.refetch
  }
}

export const useAllPostContent = (
  categoryId?: number,
  options: UsePostContentOptions = {}
) => {
  const query = useQuery({
    queryKey: ['allPostContent', categoryId],
    queryFn: () => postContentApi.getAll(categoryId),
    enabled: options.enabled !== false,
    staleTime: options.staleTime ?? 2 * 60 * 1000,
    refetchOnMount: options.refetchOnMount ?? true
  })

  return {
    contents: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error || null,
    isSuccess: query.isSuccess,
    refetch: query.refetch
  }
} 