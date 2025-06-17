import { useState, useMemo, useCallback } from 'react'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../lib/queryKeys'
import type { FilterOptions, SortOption, HashtagDto } from '../types'
import { API_BASE_URL } from '../../../utils/api'

export interface PostDTO {
  id: number
  user: {
    id: number
    username: string
    avatarUrl?: string
  }
  category: {
    id: number
    name: string
  }
  title: string
  description: string
  createdAt: string
  readTime: number
  imageUrl?: string
  hashtags?: Array<{
    id: number
    name: string
    postCount: number
  }>
}

export interface UsePostsReturn {
  posts: PostDTO[]
  hashtags: HashtagDto[]
  categories: Array<{ id: number; name: string }>
  isLoading: boolean
  error: string | null
  sortBy: SortOption
  filters: FilterOptions
  filteredPosts: PostDTO[]
  setSortBy: (sort: SortOption) => void
  setFilters: (filters: Partial<FilterOptions>) => void
  refreshPosts: () => void
}

const usePostsData = () => {
  return useQuery({
    queryKey: queryKeys.posts.list({}),
    queryFn: async (): Promise<PostDTO[]> => {
      const response = await fetch(`${API_BASE_URL}/posts?limit=50`)
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`)
      }
      return response.json()
    },
  })
}

const useHashtagsData = () => {
  return useQuery({
    queryKey: queryKeys.hashtags.list(),
    queryFn: async (): Promise<HashtagDto[]> => {
      const response = await fetch(`${API_BASE_URL}/hashtags`)
      if (!response.ok) {
        throw new Error(`Failed to fetch hashtags: ${response.status}`)
      }
      return response.json()
    },
  })
}

export const usePostsSuspense = (): Omit<UsePostsReturn, 'isLoading' | 'error'> => {
  const { data: posts } = useSuspenseQuery({
    queryKey: queryKeys.posts.list({}),
    queryFn: async (): Promise<PostDTO[]> => {
      const response = await fetch(`${API_BASE_URL}/posts?limit=50`)
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`)
      }
      return response.json()
    },
  })

  const { data: hashtags } = useSuspenseQuery({
    queryKey: queryKeys.hashtags.list(),
    queryFn: async (): Promise<HashtagDto[]> => {
      const response = await fetch(`${API_BASE_URL}/hashtags`)
      if (!response.ok) {
        throw new Error(`Failed to fetch hashtags: ${response.status}`)
      }
      return response.json()
    },
  })

  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [filters, setFiltersState] = useState<FilterOptions>({
    hashtags: [],
    searchQuery: ''
  })

  const categories = useMemo(() => {
    const uniqueCategories = posts.reduce((acc, post) => {
      if (post.category && !acc.find(cat => cat.id === post.category.id)) {
        acc.push(post.category)
      }
      return acc
    }, [] as Array<{ id: number; name: string }>)
    
    return uniqueCategories
  }, [posts])

  const filteredPosts = useMemo(() => {
    let filtered = [...posts]

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.category.name.toLowerCase().includes(query)
      )
    }

    if (filters.category) {
      filtered = filtered.filter(post => post.category.name === filters.category)
    }

    if (filters.hashtags.length > 0) {
      filtered = filtered.filter(post => 
        post.hashtags?.some(hashtag => 
          filters.hashtags.includes(hashtag.name)
        )
      )
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case 'readTime':
        filtered.sort((a, b) => a.readTime - b.readTime)
        break
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  }, [posts, filters, sortBy])

  const setFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }))
  }, [])

  const refreshPosts = useCallback(() => {
  }, [])

  return {
    posts,
    hashtags,
    categories,
    sortBy,
    filters,
    filteredPosts,
    setSortBy,
    setFilters,
    refreshPosts
  }
}

export const usePosts = (): UsePostsReturn => {
  const { data: posts = [], isLoading: postsLoading, error: postsError, refetch: refetchPosts } = usePostsData()
  const { data: hashtags = [], isLoading: hashtagsLoading, error: hashtagsError } = useHashtagsData()
  
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [filters, setFiltersState] = useState<FilterOptions>({
    hashtags: [],
    searchQuery: ''
  })

  const categories = useMemo(() => {
    const uniqueCategories = posts.reduce((acc, post) => {
      if (post.category && !acc.find(cat => cat.id === post.category.id)) {
        acc.push(post.category)
      }
      return acc
    }, [] as Array<{ id: number; name: string }>)
    
    return uniqueCategories
  }, [posts])

  const filteredPosts = useMemo(() => {
    let filtered = [...posts]

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.category.name.toLowerCase().includes(query)
      )
    }

    if (filters.category) {
      filtered = filtered.filter(post => post.category.name === filters.category)
    }

    if (filters.hashtags.length > 0) {
      filtered = filtered.filter(post => 
        post.hashtags?.some(hashtag => 
          filters.hashtags.includes(hashtag.name)
        )
      )
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case 'readTime':
        filtered.sort((a, b) => a.readTime - b.readTime)
        break
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  }, [posts, filters, sortBy])

  const setFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }))
  }, [])

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