import { memo } from 'react'
import { EnvelopeIcon, LockClosedIcon, KeyIcon } from '@heroicons/react/24/outline'
import { useRegisterForm } from '../hooks/useRegisterForm.hook'
import { Input } from '../../ui/Input/Input.component'
import { Button } from '../../ui/Button/Button.component'
import type { RegisterFormProps } from '../types'

export const RegisterForm = memo<RegisterFormProps>(({ 
  onSubmit, 
  isLoading: externalLoading = false,
  error: externalError 
}) => {
  const { formData, errors, isLoading, updateField, handleSubmit } = useRegisterForm()

  const loading = isLoading || externalLoading
  const serverError = errors.server || externalError

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(() => {
      onSubmit?.(formData)
    })
  }

  return (
    <form onSubmit={onFormSubmit} className="space-y-6">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="text-sm">{serverError}</p>
        </div>
      )}

      <Input
        label="Adres email"
        type="email"
        value={formData.email}
        onChange={(e) => updateField('email', e.target.value)}
        error={errors.email}
        placeholder="twoj@email.com"
        disabled={loading}
        autoComplete="email"
        leftIcon={<EnvelopeIcon className="w-5 h-5" />}
      />

      <Input
        label="Hasło"
        type="password"
        value={formData.password}
        onChange={(e) => updateField('password', e.target.value)}
        error={errors.password}
        placeholder="Minimum 8 znaków"
        disabled={loading}
        autoComplete="new-password"
        leftIcon={<LockClosedIcon className="w-5 h-5" />}
        isPassword
        showPasswordToggle
      />

      <Input
        label="Powtórz hasło"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => updateField('confirmPassword', e.target.value)}
        error={errors.confirmPassword}
        placeholder="Powtórz hasło"
        disabled={loading}
        autoComplete="new-password"
        leftIcon={<KeyIcon className="w-5 h-5" />}
        isPassword
        showPasswordToggle
      />
        
      <Button
        type="submit"
        disabled={loading}
        isLoading={loading}
        fullWidth
        size="lg"
      >
        Zarejestruj się
      </Button>
    </form>
  )
})

RegisterForm.displayName = 'RegisterForm' 