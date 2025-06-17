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