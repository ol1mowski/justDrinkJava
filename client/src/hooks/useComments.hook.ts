import { useState, useEffect, useCallback } from 'react'
import { commentsApi, type CommentResponse, type CreateCommentRequest, type UpdateCommentRequest, CommentsApiError } from '../api/comments.api'

export interface UseCommentsOptions {
  enabled?: boolean
  refetchOnMount?: boolean
}

export interface UseCommentsResult {
  comments: CommentResponse[]
  isLoading: boolean
  isError: boolean
  error: string | null
  commentsCount: number
  
  createComment: (request: CreateCommentRequest) => Promise<void>
  updateComment: (commentId: number, request: UpdateCommentRequest) => Promise<void>
  deleteComment: (commentId: number) => Promise<void>
  toggleLike: (commentId: number) => Promise<void>
  refetch: () => Promise<void>
  clearError: () => void
}

export const useComments = (
  postId: number,
  options: UseCommentsOptions = {}
): UseCommentsResult => {
  const [comments, setComments] = useState<CommentResponse[]>([])
  const [commentsCount, setCommentsCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = useCallback(() => {
    setIsError(false)
    setError(null)
  }, [])

  const handleError = useCallback((err: unknown) => {
    console.error('Comments error:', err)
    setIsError(true)
    
    if (err instanceof CommentsApiError) {
      setError(err.message)
    } else if (err instanceof Error) {
      setError(err.message)
    } else {
      setError('Wystąpił nieoczekiwany błąd')
    }
  }, [])

  const fetchComments = useCallback(async () => {
    if (!postId) return

    try {
      setIsLoading(true)
      clearError()

      const [commentsData, countData] = await Promise.all([
        commentsApi.getByPostId(postId),
        commentsApi.getCountByPostId(postId)
      ])

      setComments(commentsData)
      setCommentsCount(countData)
    } catch (err) {
      handleError(err)
    } finally {
      setIsLoading(false)
    }
  }, [postId, clearError, handleError])

  const createComment = useCallback(async (request: CreateCommentRequest) => {
    try {
      setIsLoading(true)
      clearError()

      const newComment = await commentsApi.create(request)
        
      setComments(prev => [newComment, ...prev])
      setCommentsCount(prev => prev + 1)
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [clearError, handleError])

  const updateComment = useCallback(async (commentId: number, request: UpdateCommentRequest) => {
    try {
      setIsLoading(true)
      clearError()

      const updatedComment = await commentsApi.update(commentId, request)
      
      setComments(prev => prev.map(comment => 
        comment.id === commentId ? updatedComment : comment
      ))
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [clearError, handleError])

  const deleteComment = useCallback(async (commentId: number) => {
    try {
      setIsLoading(true)
      clearError()

      await commentsApi.delete(commentId)
      
      setComments(prev => prev.filter(comment => comment.id !== commentId))
      setCommentsCount(prev => prev - 1)
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [clearError, handleError])

  const toggleLike = useCallback(async (commentId: number) => {
    try {
      const updatedComment = await commentsApi.toggleLike(commentId)
      
      setComments(prev => prev.map(comment => 
        comment.id === commentId ? updatedComment : comment
      ))
      
      // Refetch comments to ensure consistency with backend
      await fetchComments()
    } catch (err) {
      handleError(err)
      throw err
    }
  }, [handleError, fetchComments])

  const refetch = useCallback(async () => {
    await fetchComments()
  }, [fetchComments])

  useEffect(() => {
    if (options.enabled !== false) {
      fetchComments()
    }
  }, [fetchComments, options.enabled])

  return {
    comments,
    isLoading,
    isError,
    error,
    commentsCount,
    createComment,
    updateComment,
    deleteComment,
    toggleLike,
    refetch,
    clearError
  }
} 