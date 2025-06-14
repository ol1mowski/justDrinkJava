import { useState, useCallback } from 'react'
import type { LoginFormData } from '../types'

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})
  const [isLoading, setIsLoading] = useState(false)

  const updateField = useCallback((field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }, [errors])

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<LoginFormData> = {}

    if (!formData.email) {
      newErrors.email = 'Email jest wymagany'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email'
    }

    if (!formData.password) {
      newErrors.password = 'Hasło jest wymagane'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Hasło musi mieć co najmniej 6 znaków'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback((onSubmit: (data: LoginFormData) => void) => {
    if (validateForm()) {
      setIsLoading(true)
      onSubmit(formData)
      // Reset loading state after submission
      setTimeout(() => setIsLoading(false), 1000)
    }
  }, [formData, validateForm])

  const resetForm = useCallback(() => {
    setFormData({
      email: '',
      password: '',
      rememberMe: false
    })
    setErrors({})
    setIsLoading(false)
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