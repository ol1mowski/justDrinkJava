import { memo, useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useRegisterForm } from '../hooks/useRegisterForm.hook'

interface RegisterFormProps {
  onSubmit?: () => void
  isLoading?: boolean
}

export const RegisterForm = memo<RegisterFormProps>(({ onSubmit, isLoading: externalLoading = false }) => {
  const { formData, errors, isLoading, updateField, handleSubmit } = useRegisterForm()
  const [showPassword, setShowPassword] = useState(false)

  const loading = isLoading || externalLoading

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(() => {
          if (onSubmit) {
            onSubmit()
          }
        })
      }}
      className="space-y-6"
    >
      {errors.server && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="text-sm">{errors.server}</p>
        </div>
      )}

      <div>
        <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-2">
          Adres email
        </label>
        <input
          id="register-email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-java-orange focus:border-transparent transition-colors duration-200 ${
            errors.email 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
          placeholder="twoj@email.com"
          disabled={loading}
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="register-firstName" className="block text-sm font-medium text-gray-700 mb-2">
          Imię
        </label>
        <input
          id="register-firstName"
          type="text"
          value={formData.firstName}
          onChange={(e) => updateField('firstName', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-java-orange focus:border-transparent transition-colors duration-200 ${
            errors.firstName 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
          placeholder="Jan"
          disabled={loading}
          autoComplete="given-name"
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
        )}
      </div>

      <div>
        <label htmlFor="register-lastName" className="block text-sm font-medium text-gray-700 mb-2">
          Nazwisko
        </label>
        <input
          id="register-lastName"
          type="text"
          value={formData.lastName}
          onChange={(e) => updateField('lastName', e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-java-orange focus:border-transparent transition-colors duration-200 ${
            errors.lastName 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
          placeholder="Kowalski"
          disabled={loading}
          autoComplete="family-name"
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
        )}
      </div>

      <div>
        <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-2">
          Hasło
        </label>
        <div className="relative">
          <input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-java-orange focus:border-transparent transition-colors duration-200 ${
              errors.password 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
            placeholder="Minimum 8 znaków"
            disabled={loading}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            disabled={loading}
            aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
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
        
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-java-orange hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            Rejestracja...
          </>
        ) : (
          'Zarejestruj się'
        )}
      </button>
    </form>
  )
})

RegisterForm.displayName = 'RegisterForm' 