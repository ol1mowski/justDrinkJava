import { useState, useCallback } from 'react'
import { useAuth } from '../../../hooks/useAuth.hook'
import type { LoginFormData } from '../types'

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData | 'server', string>>>({})
  const { login, isLoading } = useAuth()

  const updateField = useCallback((field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
    if (errors.server) {
      setErrors(prev => ({ ...prev, server: undefined }))
    }
  }, [errors])

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof LoginFormData, string>> = {}

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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback(async (onSuccess?: () => void) => {
    console.log('📝 Form submission started')
    
    if (!validateForm()) {
      console.log('❌ Form validation failed')
      return
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      })

      if (result.success) {
        console.log('✅ Login successful, clearing form')
        setFormData({
          email: '',
          password: '',
          rememberMe: false
        })
        setErrors({})
        if (onSuccess) {
          onSuccess()
        }
      } else {
        console.log('❌ Login failed:', result.error)
        
        if (result.errors) {
          const serverErrors: Partial<Record<keyof LoginFormData, string>> = {}
          
          if (result.errors.email) {
            serverErrors.email = result.errors.email
          }
          if (result.errors.password) {
            serverErrors.password = result.errors.password
          }
          
          setErrors(prev => ({ ...prev, ...serverErrors }))
        } else {
          setErrors(prev => ({ ...prev, server: result.error }))
        }
      }
    } catch (error) {
      console.error('💥 Unexpected login error:', error)
      setErrors(prev => ({ 
        ...prev, 
        server: 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie.' 
      }))
    }
  }, [formData, validateForm, login])

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
    resetForm
  }
} 