import { memo } from 'react';
import { AuthContainer } from './components/AuthContainer.component';
import { BenefitsSection } from './components/BenefitsSection.component';

export const AuthPage = memo(() => {
  const handleForgotPassword = () => {
    console.log('Navigate to forgot password page');
    // TODO: Implement forgot password navigation
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2">
        <BenefitsSection />
      </div>

      <div className="w-full lg:w-1/2">
        <AuthContainer onForgotPassword={handleForgotPassword} />
      </div>
    </div>
  );
});

AuthPage.displayName = 'AuthPage';
