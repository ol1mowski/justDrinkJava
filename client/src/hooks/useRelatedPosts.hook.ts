import { usePost } from './usePost.hook'
import type { PostData } from '../utils/api'

export interface UseRelatedPostsResult {
  posts: PostData[]
  isLoading: boolean
  hasErrors: boolean
}

export const useRelatedPosts = (mainPostId: number): UseRelatedPostsResult => {
  const nextPostId1 = mainPostId + 1
  const nextPostId2 = mainPostId + 2

  const { post: post1, isLoading: isLoading1, isError: isError1 } = usePost(nextPostId1, {
    enabled: !!mainPostId
  })
  
  const { post: post2, isLoading: isLoading2, isError: isError2 } = usePost(nextPostId2, {
    enabled: !!mainPostId
  })

  const posts = [post1, post2].filter(Boolean) as PostData[]
  const isLoading = isLoading1 || isLoading2
  const hasErrors = isError1 && isError2

  return {
    posts,
    isLoading,
    hasErrors
  }
} 