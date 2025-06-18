import { httpClient } from './http-client.api'
import { removeAuthToken } from './base.api'
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  GoogleAuthRequest,
  GitHubAuthRequest,
  PostData,
  SearchPostsRequest,
  SearchPostsResponse,
  UserData,
  UpdateProfileRequest,
  UpdateProfileResponse,
  ChangePasswordRequest,
  StandardResponse
} from './types.api'

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return httpClient.post<AuthResponse>("/auth/login", credentials)
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    return httpClient.post<AuthResponse>("/auth/register", userData)
  },

  googleAuth: async (googleData: GoogleAuthRequest): Promise<AuthResponse> => {
    return httpClient.post<AuthResponse>("/auth/google", googleData)
  },

  githubAuth: async (githubData: GitHubAuthRequest): Promise<AuthResponse> => {
    return httpClient.post<AuthResponse>("/auth/github", githubData)
  },

  logout: (): void => {
    removeAuthToken()
  },

  refreshToken: async (): Promise<AuthResponse> => {
    return httpClient.post<AuthResponse>("/auth/refresh")
  }
}

export const postService = {
  getLatest: async (): Promise<PostData> => {
    return httpClient.get<PostData>("/posts/latest")
  },

  getById: async (id: number): Promise<PostData> => {
    return httpClient.get<PostData>(`/posts/${id}`)
  },

  getLatestByCategory: async (categoryId: number): Promise<PostData> => {
    return httpClient.get<PostData>(`/posts/latest/category/${categoryId}`)
  },

  search: async (request: SearchPostsRequest): Promise<SearchPostsResponse> => {
    return httpClient.post<SearchPostsResponse>("/posts/search", {
      query: request.query,
      limit: request.limit || 10,
      offset: request.offset || 0
    })
  },

  toggleLike: async (postId: number): Promise<PostData> => {
    return httpClient.post<PostData>(`/posts/${postId}/like`)
  }
}

export const userService = {
  getCurrent: async (): Promise<UserData> => {
    return httpClient.get<UserData>("/user/profile")
  },

  updateProfile: async (request: UpdateProfileRequest): Promise<UpdateProfileResponse> => {
    return httpClient.put<UpdateProfileResponse>("/user/profile", request)
  },

  changePassword: async (request: ChangePasswordRequest): Promise<StandardResponse> => {
    return httpClient.put<StandardResponse>("/user/password", request)
  },

  deleteAccount: async (): Promise<StandardResponse> => {
    return httpClient.delete<StandardResponse>("/user/account")
  }
    } 