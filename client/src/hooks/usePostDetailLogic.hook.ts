import { useNavigate, useParams } from 'react-router-dom'
import { useCallback } from 'react'
import { usePost } from './usePost.hook'
import { useRelatedPosts } from './useRelatedPosts.hook'
import { usePostInteractions } from './usePostInteractions.hook'
import { useAuth } from './useAuth.hook'

export interface UsePostDetailLogicResult {
  postId: number
  post: ReturnType<typeof usePost>['post']
  isPostLoading: boolean
  isPostError: boolean
  postError: Error | null
  relatedPosts: ReturnType<typeof useRelatedPosts>['posts']
  isRelatedLoading: boolean
  interactions: ReturnType<typeof usePostInteractions>['interactions']
  toggleLike: () => void
  toggleBookmark: () => void
  handleBack: () => void
  formatDate: (dateString: string) => string
  isAuthenticated: boolean
  currentUser: ReturnType<typeof useAuth>['user']
}

export const usePostDetailLogic = (): UsePostDetailLogicResult => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { isAuthenticated, user: currentUser } = useAuth()
  
  const postId = parseInt(id || '1', 10)
  const { post, isLoading: isPostLoading, isError: isPostError, error: postError } = usePost(postId)
  const { posts: relatedPosts, isLoading: isRelatedLoading } = useRelatedPosts(postId)
  const { interactions, toggleLike, toggleBookmark } = usePostInteractions()

  const handleBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }, [])

  return {
    postId,
    post,
    isPostLoading,
    isPostError,
    postError,
    relatedPosts,
    isRelatedLoading,
    interactions,
    toggleLike,
    toggleBookmark,
    handleBack,
    formatDate,
    isAuthenticated,
    currentUser
  }
} 