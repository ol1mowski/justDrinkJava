export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void
  isLoading?: boolean
}

export interface InputFieldProps {
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  icon?: React.ReactNode
  showPasswordToggle?: boolean
}

export interface SocialButtonProps {
  provider: 'google'
  onClick: () => void
  children: React.ReactNode
}

export interface TabSwitcherProps {
  activeTab: 'login' | 'register' | 'reset'
  onTabChange: (tab: 'login' | 'register' | 'reset') => void
} 