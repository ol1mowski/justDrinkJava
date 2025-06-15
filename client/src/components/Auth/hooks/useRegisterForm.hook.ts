import { useState, useCallback } from 'react'
import { useAuth } from '../../../hooks/useAuth.hook'
import { validateRegisterForm } from '../utils/validation.util'
import type { RegisterFormData } from '../types'

interface UseRegisterFormReturn {
  formData: RegisterFormData
  errors: Record<string, string>
  isLoading: boolean
  updateField: (field: keyof RegisterFormData, value: string) => void
  handleSubmit: (onSuccess?: () => void) => Promise<void>
  resetForm: () => void
  isValid: boolean
}

export const useRegisterForm = (): UseRegisterFormReturn => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { register, isLoading } = useAuth()

  const updateField = useCallback((field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
    
    if (errors.server) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.server
        return newErrors
      })
    }
  }, [errors])

  const isValid = useCallback(() => {
    const validationErrors = validateRegisterForm(formData)
    return Object.keys(validationErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback(async (onSuccess?: () => void) => {
    console.log('📝 Registration form submission started')
        
    const validationErrors = validateRegisterForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      console.log('❌ Form validation failed:', validationErrors)
      return
    }

    try {
      const result = await register({
        email: formData.email,
        password: formData.password
      })

      if (result.success) {
        console.log('✅ Registration successful')
        setFormData({
          email: '',
          password: '',
          confirmPassword: ''
        })
        setErrors({})
        onSuccess?.()
      } else {
        console.log('❌ Registration failed:', result.error)
        
        if (result.errors) {
          setErrors(result.errors)
        } else {
          setErrors({ server: result.error || 'Wystąpił błąd podczas rejestracji' })
        }
      }
    } catch (error) {
      console.error('💥 Unexpected registration error:', error)
      setErrors({ 
        server: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.' 
      })
    }
  }, [formData, register])

  const resetForm = useCallback(() => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: ''
    })
    setErrors({})
  }, [])

  return {
    formData,
    errors,
    isLoading,
    updateField,
    handleSubmit,
    resetForm,
    isValid: isValid()
  }
} 