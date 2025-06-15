export const API_BASE_URL = 'http://localhost:8080/api'

export interface ApiResponse<T> {
  data?: T
  status: 'success' | 'error'
  message?: string
  errors?: Record<string, string>
}

export interface AuthResponse {
  token: string
  type: string
  user: {
    id: number
    email: string
    username: string
    createdAt: string
  }
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        return {
          status: 'error',
          message: data.message || 'Wystąpił błąd',
          errors: data.errors,
        }
      }

      return {
        status: 'success',
        data,
      }
    } catch (error) {
      console.error('API Error:', error)
      return {
        status: 'error',
        message: 'Błąd połączenia z serwerem',
      }
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}
  
export const apiClient = new ApiClient(API_BASE_URL)

export const authApi = {
  login: (credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post<AuthResponse>('/auth/login', credentials)
  },

  register: (userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post<AuthResponse>('/auth/register', userData)
  },

  logout: (): void => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
  },
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
}

export interface ApiError {
  timestamp: string
  status: number
  error: string
  message: string
  path: string
}

class ApiService {
  private async fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        const errorData: ApiError = await response.json()
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Wystąpił nieoczekiwany błąd')
    }
  }

  async getLatestPost(): Promise<PostData> {
    return this.fetchWithErrorHandling<PostData>(`${API_BASE_URL}/posts/latest`)
  }

  async getLatestPostByCategory(categoryId: number): Promise<PostData> {
    return this.fetchWithErrorHandling<PostData>(`${API_BASE_URL}/posts/latest/category/${categoryId}`)
  }
}

export const apiService = new ApiService()