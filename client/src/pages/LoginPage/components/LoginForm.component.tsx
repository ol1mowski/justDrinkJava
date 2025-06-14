import { memo, useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useLoginForm } from '../hooks/useLoginForm.hook'
import type { LoginFormProps } from '../types'

export const LoginForm = memo<LoginFormProps>(({ onSubmit, isLoading = false }) => {
  const { formData, errors, updateField, handleSubmit } = useLoginForm()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(onSubmit)
      }}
      className="space-y-6"
    >
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Adres email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-java-orange focus:border-transparent transition-colors duration-200 ${
            errors.email 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
          placeholder="twoj@email.com"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Hasło
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-java-orange focus:border-transparent transition-colors duration-200 ${
              errors.password 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
            placeholder="Wprowadź hasło"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) => updateField('rememberMe', e.target.checked)}
            className="w-4 h-4 text-java-orange border-gray-300 rounded focus:ring-java-orange focus:ring-2"
            disabled={isLoading}
          />
          <span className="ml-2 text-sm text-gray-600">Zapamiętaj mnie</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-java-orange hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            Logowanie...
          </>
        ) : (
          'Zaloguj się'
        )}
      </button>
    </form>
  )
})

LoginForm.displayName = 'LoginForm' 