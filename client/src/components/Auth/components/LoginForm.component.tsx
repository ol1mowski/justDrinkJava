import { memo } from 'react'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { useLoginForm } from '../hooks/useLoginForm.hook'
import { Input } from '../../ui/Input/Input.component'
import { Button } from '../../ui/Button/Button.component'
import type { LoginFormProps } from '../types'

export const LoginForm = memo<LoginFormProps>(({ 
  onSubmit, 
  isLoading: externalLoading = false,
  error: externalError 
}) => {
  const { formData, errors, isLoading, updateField, handleSubmit } = useLoginForm()

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
        placeholder="Wprowadź hasło"
        disabled={loading}
        autoComplete="current-password"
        leftIcon={<LockClosedIcon className="w-5 h-5" />}
        isPassword
        showPasswordToggle
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) => updateField('rememberMe', e.target.checked)}
            className="w-4 h-4 text-java-orange border-gray-300 rounded focus:ring-java-orange focus:ring-2"
            disabled={loading}
          />
          <span className="ml-2 text-sm text-gray-600">Zapamiętaj mnie</span>
        </label>
      </div>
        
      <Button
        type="submit"
        disabled={loading}
        isLoading={loading}
        fullWidth
        size="lg"
      >
        Zaloguj się
      </Button>
    </form>
  )
})

LoginForm.displayName = 'LoginForm' 