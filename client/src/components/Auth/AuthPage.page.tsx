import { memo } from 'react'
import { AuthContainer } from './components/AuthContainer.component'
import { BenefitsSection } from './components/BenefitsSection.component'

export const AuthPage = memo(() => {
  const handleLogin = () => {
    // Login logic will be handled by AuthContainer and hooks
  }

  const handleRegister = () => {
    // Register logic will be handled by AuthContainer and hooks
  }

  const handleGoogleLogin = () => {
    console.log('Google OAuth login')
    // TODO: Implement Google OAuth
  }

  const handleGithubLogin = () => {
    console.log('GitHub OAuth login')
    // TODO: Implement GitHub OAuth
  }

  const handleForgotPassword = () => {
    console.log('Navigate to forgot password page')
    // TODO: Implement forgot password navigation
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2">
        <BenefitsSection />
      </div>
      
      <div className="w-full lg:w-1/2">
        <AuthContainer
          onLogin={handleLogin}
          onRegister={handleRegister}
          onGoogleLogin={handleGoogleLogin}
          onGithubLogin={handleGithubLogin}
          onForgotPassword={handleForgotPassword}
        />
      </div>
    </div>
  )
})

AuthPage.displayName = 'AuthPage' 