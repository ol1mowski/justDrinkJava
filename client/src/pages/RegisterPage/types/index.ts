export interface RegisterFormData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void
  isLoading?: boolean
}

export interface BenefitItemProps {
  icon: React.ReactNode
  title: string
  description: string
} 