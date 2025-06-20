export type SortOption = 'newest' | 'oldest' | 'readTime' | 'title'

export interface FilterOptions {
  searchQuery: string
  category?: string
}

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
  likes?: number
  isLikedByCurrentUser?: boolean
}

export interface UsePostsReturn {
  posts: PostDTO[]
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