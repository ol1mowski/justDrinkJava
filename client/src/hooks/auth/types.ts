export interface AuthUser {
  id: string | number
  email: string
  username: string
  name?: string
  avatar?: string
  createdAt: string
  oauth?: {
    provider: string
    authorized: boolean
    code: string
    timestamp: string
  }
}

export interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface UseAuthReturn {
  isAuthenticated: boolean
  user: AuthUser | null
  isLoading: boolean
  error: string | null
  login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string; errors?: Record<string, string> }>
  register: (userData: RegisterRequest) => Promise<{ success: boolean; error?: string; errors?: Record<string, string> }>
  logout: () => void
  clearError: () => void
  checkAuthStatus: () => void
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  status: string
  message?: string
  data?: {
    token: string
    user: AuthUser
  }
  errors?: Record<string, string>
} 