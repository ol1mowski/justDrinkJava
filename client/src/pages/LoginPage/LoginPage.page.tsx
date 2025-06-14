import { memo } from 'react'
import { BenefitsSection } from './components/BenefitsSection.component'
import { LoginFormSection } from './components/LoginFormSection.component'

export const LoginPage = memo(() => (
  <div className="min-h-screen flex">
    <div className="hidden lg:flex lg:w-1/2">
      <BenefitsSection />
    </div>
    
    <div className="w-full lg:w-1/2">
      <LoginFormSection />
    </div>
  </div>
))

LoginPage.displayName = 'LoginPage' 