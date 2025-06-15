import { useState, useCallback } from 'react'
import { useAuth } from '../../../hooks/useAuth.hook'

interface RegisterFormData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData | 'server', string>>>({})
  const { register, isLoading } = useAuth()

  const updateField = useCallback((field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
    // Clear server error when user makes changes
    if (errors.server) {
      setErrors(prev => ({ ...prev, server: undefined }))
    }
  }, [errors])

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {}

    if (!formData.email) {
      newErrors.email = 'Email jest wymagany'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email'
    }

    if (!formData.password) {
      newErrors.password = 'Hasło jest wymagane'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Hasło musi mieć minimum 8 znaków'
    }

    if (!formData.firstName) {
      newErrors.firstName = 'Imię jest wymagane'
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'Imię musi mieć minimum 2 znaki'
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Nazwisko jest wymagane'
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Nazwisko musi mieć minimum 2 znaki'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback(async (onSuccess?: () => void) => {
    console.log('📝 Registration form submission started')
    
    if (!validateForm()) {
      console.log('❌ Registration form validation failed')
      return
    }

    try {
      const result = await register(formData)

      if (result.success) {
        console.log('✅ Registration successful, clearing form')
        // Clear form on successful registration
        setFormData({
          email: '',
          password: '',
          firstName: '',
          lastName: ''
        })
        setErrors({})
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess()
        }
      } else {
        console.log('❌ Registration failed:', result.error)
        
        // Handle validation errors from server
        if (result.errors) {
          const serverErrors: Partial<Record<keyof RegisterFormData, string>> = {}
          
          // Map server errors to form fields
          Object.keys(result.errors).forEach((key) => {
            if (key in formData) {
              serverErrors[key as keyof RegisterFormData] = result.errors![key]
            }
          })
          
          setErrors(prev => ({ ...prev, ...serverErrors }))
        } else {
          // Set general server error
          setErrors(prev => ({ ...prev, server: result.error }))
        }
      }
    } catch (error) {
      console.error('💥 Unexpected registration error:', error)
      setErrors(prev => ({ 
        ...prev, 
        server: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.' 
      }))
    }
  }, [formData, validateForm, register])

  const resetForm = useCallback(() => {
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    })
    setErrors({})
  }, [])

  return {
    formData,
    errors,
    isLoading,
    updateField,
    handleSubmit,
    resetForm
  }
} 