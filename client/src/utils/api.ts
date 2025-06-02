export const API_BASE_URL = 'http://localhost:8080/api'

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