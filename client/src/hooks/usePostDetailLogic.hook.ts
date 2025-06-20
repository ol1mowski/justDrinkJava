import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { usePost } from './usePost.hook'
import { useRelatedPosts } from './useRelatedPosts.hook'
import { usePostLike } from './usePostLike.hook'
import { useAuth } from './auth/useAuth.hook'

export interface PostInteractions {
  isLiked: boolean
  isBookmarked: boolean
  likeCount: number
  bookmarkCount: number
}

export interface UsePostDetailLogicResult {
  postId: number
  post: ReturnType<typeof usePost>['post']
  isPostLoading: boolean
  isPostError: boolean
  postError: Error | null
  relatedPosts: ReturnType<typeof useRelatedPosts>['posts']
  isRelatedLoading: boolean
  interactions: PostInteractions
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
  const { post, isLoading: isPostLoading, isError: isPostError, error: postError, refetch } = usePost(postId)
  const { posts: relatedPosts, isLoading: isRelatedLoading } = useRelatedPosts(postId)
  const { toggleLike: togglePostLike } = usePostLike()

  const [isBookmarked, setIsBookmarked] = useState(false)

  const interactions: PostInteractions = {
    isLiked: post?.isLikedByCurrentUser || false,
    isBookmarked,
    likeCount: post?.likes || 0,
    bookmarkCount: 0
  }

  const toggleLike = useCallback(async () => {
    if (!isAuthenticated || !post) {
      return
    }

    const result = await togglePostLike(postId)
    if (result) {
      refetch()
    }
  }, [postId, togglePostLike, isAuthenticated, post, refetch])

  const toggleBookmark = useCallback(() => {      
    setIsBookmarked(prev => !prev)
  }, [])

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