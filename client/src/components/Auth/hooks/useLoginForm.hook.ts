import { useState, useCallback } from 'react'
import { useAuth } from '../../../hooks/useAuth.hook'
import { validateLoginForm } from '../utils/validation.util'
import type { LoginFormData } from '../types'

interface UseLoginFormReturn {
  formData: LoginFormData
  errors: Record<string, string>
  isLoading: boolean
  updateField: (field: keyof LoginFormData, value: string | boolean) => void
  handleSubmit: (onSuccess?: () => void) => Promise<void>
  resetForm: () => void
  isValid: boolean
}

export const useLoginForm = (): UseLoginFormReturn => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { login, isLoading } = useAuth()

  const updateField = useCallback((field: keyof LoginFormData, value: string | boolean) => {
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
    const validationErrors = validateLoginForm(formData)
    return Object.keys(validationErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback(async (onSuccess?: () => void) => {
    console.log('📝 Login form submission started')
      
    const validationErrors = validateLoginForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      console.log('❌ Form validation failed:', validationErrors)
      return
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      })

      if (result.success) {
        console.log('✅ Login successful')
        setFormData({
          email: '',
          password: '',
          rememberMe: false
        })
        setErrors({})
        onSuccess?.()
      } else {
        console.log('❌ Login failed:', result.error)
        
        if (result.errors) {
          setErrors(result.errors)
        } else {
          setErrors({ server: result.error || 'Wystąpił błąd podczas logowania' })
        }
      }
    } catch (error) {
      console.error('💥 Unexpected login error:', error)
      setErrors({ 
        server: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.' 
      })
    }
  }, [formData, login])

  const resetForm = useCallback(() => {
    setFormData({
      email: '',
      password: '',
      rememberMe: false
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