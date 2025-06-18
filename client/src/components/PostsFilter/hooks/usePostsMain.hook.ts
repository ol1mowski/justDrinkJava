import { useCallback } from 'react'
import { usePostsData } from './usePostsData.hook'
import { useHashtagsData } from './useHashtagsData.hook'
import { useFiltersState } from './useFiltersState.hook'
import { usePostsFiltering } from './usePostsFiltering.hook'
import { useCategories } from './useCategories.hook'
import type { UsePostsReturn } from '../types'

export const usePosts = (): UsePostsReturn => {
  const { data: posts = [], isLoading: postsLoading, error: postsError, refetch: refetchPosts } = usePostsData()
  const { data: hashtags = [], isLoading: hashtagsLoading, error: hashtagsError } = useHashtagsData()
  
  const { sortBy, setSortBy, filters, setFilters } = useFiltersState()
  const { filteredPosts } = usePostsFiltering({ posts, filters, sortBy })
  const { categories } = useCategories(posts)

  const refreshPosts = useCallback(() => {
    refetchPosts()
  }, [refetchPosts])

  const isLoading = postsLoading || hashtagsLoading
  const error = postsError?.message || hashtagsError?.message || null

  return {
    posts,
    hashtags,
    categories,
    isLoading,
    error,
    sortBy,
    filters,
    filteredPosts,
    setSortBy,
    setFilters,
    refreshPosts
  }
} 