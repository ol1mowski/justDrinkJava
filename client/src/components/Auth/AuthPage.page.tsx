import { memo } from 'react'
import { AuthContainer } from './components/AuthContainer.component'
import { BenefitsSection } from './components/BenefitsSection.component'
import { useAuthWithGoogle } from './hooks/useAuthWithGoogle.hook'

export const AuthPage = memo(() => {
  const { handleGoogleLogin, isLoading: isGoogleLoading, error: googleError } = useAuthWithGoogle()

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
          onGoogleLogin={handleGoogleLogin}
          onGithubLogin={handleGithubLogin}
          onForgotPassword={handleForgotPassword}
          isLoading={isGoogleLoading}
          error={googleError}
        />
      </div>
    </div>
  )
})

AuthPage.displayName = 'AuthPage' 