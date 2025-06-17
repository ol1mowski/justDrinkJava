import { useState, useCallback } from 'react'

export interface PostInteractions {
  isLiked: boolean
  isBookmarked: boolean
  likeCount: number
  bookmarkCount: number
}

export interface UsePostInteractionsResult {
  interactions: PostInteractions
  toggleLike: () => void
  toggleBookmark: () => void
}

export const usePostInteractions = (
  initialLiked: boolean = false,
  initialBookmarked: boolean = false,
  initialLikeCount: number = 0,
  initialBookmarkCount: number = 0
): UsePostInteractionsResult => {
  const [interactions, setInteractions] = useState<PostInteractions>({
    isLiked: initialLiked,
    isBookmarked: initialBookmarked,
    likeCount: initialLikeCount,
    bookmarkCount: initialBookmarkCount
  })

  const toggleLike = useCallback(() => {
    setInteractions(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1
    }))
  }, [])

  const toggleBookmark = useCallback(() => {
    setInteractions(prev => ({
      ...prev,
      isBookmarked: !prev.isBookmarked,
      bookmarkCount: prev.isBookmarked ? prev.bookmarkCount - 1 : prev.bookmarkCount + 1
    }))
  }, [])

  return {
    interactions,
    toggleLike,
    toggleBookmark
  }
} 