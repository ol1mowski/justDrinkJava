import { memo } from 'react'
import { LoginForm } from './LoginForm.component'
import { SocialLogin } from './SocialLogin.component'
import { LoginActions } from './LoginActions.component'
import { LockClosedIcon } from '@heroicons/react/24/outline'

export const LoginFormSection = memo(() => {
  const handleLogin = (data: any) => {
    console.log('Login data:', data)
    // TODO: Implement actual login logic
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
    console.log('Navigate to register')
    // TODO: Navigate to register page
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
            <LockClosedIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Witaj ponownie!
          </h2>
          <p className="text-gray-600">
            Zaloguj się do swojego konta
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Social Login */}
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

          {/* Login Form */}
          <LoginForm onSubmit={handleLogin} />

          {/* Actions */}
          <div className="mt-6">
            <LoginActions
              onRegisterClick={handleRegisterClick}
              onForgotPasswordClick={handleForgotPasswordClick}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Logując się, akceptujesz nasze{' '}
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