export * from '../api';

export interface UserData {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export interface CategoryData {
  id: number;
  name: string;
}

export interface PostData {
  id: number;
  user: UserData;
  category?: CategoryData;
  title: string;
  description: string;
  createdAt: string;
  readTime: number;
  readTimeFormatted: string;
  imageUrl?: string;
  likes: number;
  isLikedByCurrentUser: boolean;
}

export interface SearchPostsRequest {
  query: string;
  limit?: number;
  offset?: number;
}

export interface SearchPostsResponse {
  posts: PostData[];
  total: number;
  hasMore: boolean;
}

export interface UpdateProfileRequest {
  username: string;
}

export interface UpdateProfileResponse {
  user: UserData;
  newToken?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface DeleteAccountRequest {
  confirmation: string;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
