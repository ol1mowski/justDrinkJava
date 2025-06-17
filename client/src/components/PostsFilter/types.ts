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