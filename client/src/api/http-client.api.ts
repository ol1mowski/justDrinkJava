import { 
  API_CONFIG,
  ApiNetworkError,
  ApiValidationError,
  ApiAuthenticationError,
  ApiAuthorizationError,
  ApiNotFoundError,
  getAuthToken,
  removeAuthToken,
  buildUrl
} from './base.api'

export interface ApiError {
  timestamp: string
  status: number
  error: string
  message: string
  path: string
}

export class HttpClient {
  private baseURL: string
  private timeout: number

  constructor(baseURL: string = API_CONFIG.BASE_URL, timeout: number = API_CONFIG.TIMEOUT) {
    this.baseURL = baseURL
    this.timeout = timeout
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const controller = new AbortController()
    
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    }

    const token = getAuthToken()
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const response = await fetch(url, config)
      clearTimeout(timeoutId)

      if (!response.ok) {
        await this.handleErrorResponse(response)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType?.includes("application/json")) {
        return {} as T
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiNetworkError("Request timeout")
        }
        throw error
      }
      
      throw new ApiNetworkError("Unexpected error occurred")
    }
  }

  private async handleErrorResponse(response: Response): Promise<never> {
    let errorData: ApiError
    
    try {
      errorData = await response.json()
    } catch {
      errorData = {
        timestamp: new Date().toISOString(),
        status: response.status,
        error: response.statusText,
        message: `HTTP ${response.status}: ${response.statusText}`,
        path: response.url
      }
    }

    const { status, message, errors } = errorData as ApiError & { errors?: Record<string, string> }

    switch (status) {
      case 400:
        throw new ApiValidationError(message, errors)
      case 401:
        removeAuthToken()
        throw new ApiAuthenticationError(message)
      case 403:
        throw new ApiAuthorizationError(message)
      case 404:
        throw new ApiNotFoundError(message)
      case 422:
        throw new ApiValidationError(message, errors)
      default:
        throw new Error(message || "An unexpected error occurred")
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    const url = params ? buildUrl(endpoint, params).replace(this.baseURL, '') : endpoint
    return this.request<T>(url, { method: "GET" })
  }

  async post<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async put<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }
}

export const httpClient = new HttpClient();