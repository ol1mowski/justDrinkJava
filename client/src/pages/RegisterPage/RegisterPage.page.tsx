import { memo } from 'react'
import { BenefitsSection } from './components/BenefitsSection.component'
import { RegisterFormSection } from './components/RegisterFormSection.component'

export const RegisterPage = memo(() => (
  <div className="min-h-screen flex">
    <div className="hidden lg:flex lg:w-1/2">
      <BenefitsSection />
    </div>
    
    <div className="w-full lg:w-1/2">
      <RegisterFormSection />
    </div>
  </div>
))

RegisterPage.displayName = 'RegisterPage' 