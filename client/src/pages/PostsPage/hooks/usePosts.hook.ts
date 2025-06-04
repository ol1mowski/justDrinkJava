import { useState, useEffect, useMemo, useCallback } from 'react'
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

export interface HashtagDto {
  id: number
  name: string
  postCount: number
}

export type SortOption = 'newest' | 'oldest' | 'readTime' | 'title'

export interface FilterOptions {
  category?: string
  hashtags: string[]
  searchQuery: string
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
  refreshPosts: () => Promise<void>
}

export const usePosts = (): UsePostsReturn => {
  const [posts, setPosts] = useState<PostDTO[]>([])
  const [hashtags, setHashtags] = useState<HashtagDto[]>([])
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [filters, setFiltersState] = useState<FilterOptions>({
    hashtags: [],
    searchQuery: ''
  })

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`${API_BASE_URL}/posts?limit=50`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setPosts(data)
    } catch (err) {
      console.error('Błąd podczas pobierania postów:', err)
      setError(err instanceof Error ? err.message : 'Nieznany błąd')
    }
  }, [])

  const fetchHashtags = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/hashtags`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setHashtags(data)
    } catch (err) {
      console.error('Błąd podczas pobierania hashtagów:', err)
    }
  }, [])

  const extractCategories = useCallback((posts: PostDTO[]) => {
    const uniqueCategories = posts.reduce((acc, post) => {
      if (post.category && !acc.find(cat => cat.id === post.category.id)) {
        acc.push(post.category)
      }
      return acc
    }, [] as Array<{ id: number; name: string }>)
    
    setCategories(uniqueCategories)
  }, [])

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchPosts(), fetchHashtags()])
      setIsLoading(false)
    }
    
    loadData()
  }, [fetchPosts, fetchHashtags])

  useEffect(() => {
    if (posts.length > 0) {
      extractCategories(posts)
    }
  }, [posts, extractCategories])

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

  const refreshPosts = useCallback(async () => {
    await fetchPosts()
  }, [fetchPosts])

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