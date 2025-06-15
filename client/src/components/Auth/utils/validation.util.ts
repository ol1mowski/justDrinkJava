import type { LoginFormData, RegisterFormData } from '../types'

// Validation rules
export const VALIDATION_RULES = {
  email: {
    required: 'Email jest wymagany',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Nieprawidłowy format email'
    }
  },
  password: {
    required: 'Hasło jest wymagane',
    minLength: {
      value: 8,
      message: 'Hasło musi mieć minimum 8 znaków'
    }
  },
  confirmPassword: {
    required: 'Potwierdzenie hasła jest wymagane'
  }
} as const

// Validation functions
export const validateEmail = (email: string): string | null => {
  if (!email) return VALIDATION_RULES.email.required
  if (!VALIDATION_RULES.email.pattern.value.test(email)) {
    return VALIDATION_RULES.email.pattern.message
  }
  return null
}

export const validatePassword = (password: string): string | null => {
  if (!password) return VALIDATION_RULES.password.required
  if (password.length < VALIDATION_RULES.password.minLength.value) {
    return VALIDATION_RULES.password.minLength.message
  }
  return null
}

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) return VALIDATION_RULES.confirmPassword.required
  if (password !== confirmPassword) return 'Hasła nie są identyczne'
  return null
}

export const validateLoginForm = (data: LoginFormData): Record<string, string> => {
  const errors: Record<string, string> = {}
  
  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError
  
  const passwordError = validatePassword(data.password)
  if (passwordError) errors.password = passwordError
  
  return errors
}

export const validateRegisterForm = (data: RegisterFormData): Record<string, string> => {
  const errors: Record<string, string> = {}
  
  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError
  
  const passwordError = validatePassword(data.password)
  if (passwordError) errors.password = passwordError
  
  const confirmPasswordError = validateConfirmPassword(data.password, data.confirmPassword)
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError
  
  return errors
} 