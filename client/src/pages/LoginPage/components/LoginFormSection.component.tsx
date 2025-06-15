import { memo, useState } from 'react'
import { LoginForm } from './LoginForm.component'
import { RegisterForm } from './RegisterForm.component'
import { SocialLogin } from './SocialLogin.component'
import { LoginActions } from './LoginActions.component'
import { LockClosedIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import type { LoginFormData } from '../types'

export const LoginFormSection = memo(() => {
  const [isRegisterMode, setIsRegisterMode] = useState(false)

  const handleLogin = (data: LoginFormData) => {
    console.log('✅ Login completed successfully for:', data.email)
    // Login is handled by LoginForm internally via useAuth hook
    // This callback is called after successful login
  }

  const handleRegister = () => {
    console.log('✅ Registration completed successfully')
    // Registration is handled by RegisterForm internally via useAuth hook
    // This callback is called after successful registration
  }

  const handleGoogleLogin = () => {
    console.log('Google login')
    // TODO: Implement Google OAuth
  }

  const handleGithubLogin = () => {
    console.log('GitHub login')
    // TODO: Implement GitHub OAuth
  }

  const handleRegisterClick = () => {
    setIsRegisterMode(true)
  }

  const handleLoginClick = () => {
    setIsRegisterMode(false)
  }

  const handleForgotPasswordClick = () => {
    console.log('Navigate to forgot password')
    // TODO: Navigate to forgot password page
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 lg:p-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-java-orange rounded-full flex items-center justify-center mx-auto mb-6">
            {isRegisterMode ? (
              <UserPlusIcon className="w-8 h-8 text-white" />
            ) : (
              <LockClosedIcon className="w-8 h-8 text-white" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isRegisterMode ? 'Dołącz do nas!' : 'Witaj ponownie!'}
          </h2>
          <p className="text-gray-600">
            {isRegisterMode 
              ? 'Stwórz swoje konto w Just Drink Java' 
              : 'Zaloguj się do swojego konta'
            }
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Form Mode Toggle */}
          <div className="flex mb-6">
            <button
              onClick={handleLoginClick}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-lg transition-colors duration-200 ${
                !isRegisterMode
                  ? 'bg-java-orange text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Logowanie
            </button>
            <button
              onClick={handleRegisterClick}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-lg transition-colors duration-200 ${
                isRegisterMode
                  ? 'bg-java-orange text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Rejestracja
            </button>
          </div>

          {!isRegisterMode && (
            <>
              {/* Social Login - tylko dla logowania */}
              <SocialLogin
                onGoogleLogin={handleGoogleLogin}
                onGithubLogin={handleGithubLogin}
              />

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">lub zaloguj się emailem</span>
                </div>
              </div>
            </>
          )}

          {/* Form */}
          {isRegisterMode ? (
            <RegisterForm onSubmit={handleRegister} />
          ) : (
            <LoginForm onSubmit={handleLogin} />
          )}

          {/* Actions - tylko dla logowania */}
          {!isRegisterMode && (
            <div className="mt-6">
              <LoginActions
                onRegisterClick={handleRegisterClick}
                onForgotPasswordClick={handleForgotPasswordClick}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {isRegisterMode ? 'Rejestrując się' : 'Logując się'}, akceptujesz nasze{' '}
            <a href="#" className="text-java-orange hover:underline">
              Warunki korzystania
            </a>{' '}
            i{' '}
            <a href="#" className="text-java-orange hover:underline">
              Politykę prywatności
            </a>
          </p>
        </div>
      </div>
    </div>
  )
})

LoginFormSection.displayName = 'LoginFormSection' 