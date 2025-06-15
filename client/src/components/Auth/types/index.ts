export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void
  isLoading?: boolean
  error?: string
}

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void
  isLoading?: boolean
  error?: string
}

export interface SocialLoginProps {
  onGoogleLogin: () => void
  onGithubLogin: () => void
  isLoading?: boolean
}

export interface AuthTabsProps {
  activeTab: 'login' | 'register'
  onTabChange: (tab: 'login' | 'register') => void
}

export interface AuthHeaderProps {
  isRegisterMode: boolean
}

export interface LoginActionsProps {
  onRegisterClick: () => void
  onForgotPasswordClick: () => void
}

export interface BenefitItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

export interface BenefitsSectionProps {
  className?: string
}

export interface AuthContextValue {
  isAuthenticated: boolean
  user: User | null
  login: (data: LoginFormData) => Promise<void>
  register: (data: RegisterFormData) => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
}

export interface User {
  id: string
  email: string
  username: string
  createdAt: string
}
    
export interface AuthResponse {
  token: string
  user: User
}

export interface ApiError {
  message: string
  field?: string
} 