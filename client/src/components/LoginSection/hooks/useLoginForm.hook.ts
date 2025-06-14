import { useState, useCallback } from 'react'
import type { LoginFormData } from '../types'

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const updateField = useCallback((field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [])

  const handleSubmit = useCallback((onSubmit: (data: LoginFormData) => void) => {
    setIsLoading(true)
    onSubmit(formData)
    // Reset loading state would be handled by parent component
  }, [formData])

  const resetForm = useCallback(() => {
    setFormData({
      email: '',
      password: '',
      rememberMe: false
    })
    setShowPassword(false)
  }, [])

  return {
    formData,
    showPassword,
    isLoading,
    updateField,
    togglePasswordVisibility,
    handleSubmit,
    resetForm,
    setIsLoading
  }
} 