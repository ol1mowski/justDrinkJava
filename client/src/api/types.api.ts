export interface ApiResponse<T> {
  data?: T
  status: "success" | "error"
  message?: string
  errors?: Record<string, string>
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface AuthResponse {
  token: string
  type: string
  user: UserData
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
}

export interface GoogleAuthRequest {
  credential: string
}

export interface GitHubAuthRequest {
  code: string
  state: string
}

export interface UserData {
  id: number
  username: string
  email: string
  createdAt: string
}

export interface CategoryData {
  id: number
  name: string
}

export interface PostData {
  id: number
  user: UserData
  category?: CategoryData
  title: string
  description: string
  createdAt: string
  readTime: number
  readTimeFormatted: string
  imageUrl?: string
  likes: number
  isLikedByCurrentUser: boolean
}

export interface SearchPostsRequest {
  query: string
  limit?: number
  offset?: number
}

export interface SearchPostsResponse {
  posts: PostData[]
  total: number
  hasMore: boolean
}

export interface UpdateProfileRequest {
  username: string
}

export interface UpdateProfileResponse {
  user: UserData
  newToken?: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface DeleteAccountRequest {
  confirmation: string
}

export interface StandardResponse {
  status: string
  message: string
} 