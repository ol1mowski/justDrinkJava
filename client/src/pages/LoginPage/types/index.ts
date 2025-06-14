export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void
  isLoading?: boolean
}

export interface SocialLoginProps {
  onGoogleLogin: () => void
  onGithubLogin: () => void
  isLoading?: boolean
}

export interface BenefitItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

export interface LoginActionsProps {
  onRegisterClick: () => void
  onForgotPasswordClick: () => void
} 