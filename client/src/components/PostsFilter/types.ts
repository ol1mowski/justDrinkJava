export type SortOption = 'newest' | 'oldest' | 'readTime' | 'title'

export interface FilterOptions {
  hashtags: string[]
  searchQuery: string
  category?: string
}

export interface HashtagDto {
  id: number
  name: string
  postCount: number
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