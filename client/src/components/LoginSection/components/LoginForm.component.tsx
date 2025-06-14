import { memo } from 'react'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { InputField } from './InputField.component'
import { SocialButton } from './SocialButton.component'
import { useLoginForm } from '../hooks/useLoginForm.hook'
import type { LoginFormProps } from '../types'

export const LoginForm = memo<LoginFormProps>(({ onSubmit, isLoading = false }) => {
  const {
    formData,
    showPassword,
    updateField,
    togglePasswordVisibility,
    handleSubmit
  } = useLoginForm()

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(onSubmit)
  }

  const handleSocialLogin = () => {
    console.log('Google login clicked')
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Social Login */}
      <SocialButton provider="google" onClick={handleSocialLogin}>
        Kontynuuj przy użyciu konta Google
      </SocialButton>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">LUB</span>
        </div>
      </div>

      {/* Email Field */}
      <InputField
        label="Email"
        type="email"
        placeholder="twoj@email.com"
        value={formData.email}
        onChange={(value) => updateField('email', value)}
        icon={<EnvelopeIcon />}
      />

      {/* Password Field */}
      <InputField
        label="Hasło"
        type="password"
        placeholder="Wprowadź hasło"
        value={formData.password}
        onChange={(value) => updateField('password', value)}
        icon={<LockClosedIcon />}
        showPasswordToggle={true}
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) => updateField('rememberMe', e.target.checked)}
            className="h-4 w-4 text-java-orange focus:ring-java-orange border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Zapamiętaj mnie
          </label>
        </div>
        <button
          type="button"
          className="text-sm text-java-orange hover:text-orange-600 font-medium"
        >
          Zapomniałeś hasła?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-java-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-java-orange disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Logowanie...
          </div>
        ) : (
          'Zaloguj się'
        )}
      </button>
    </form>
  )
})

LoginForm.displayName = 'LoginForm' 