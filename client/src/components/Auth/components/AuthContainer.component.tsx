import { memo, useState } from 'react';
import { AuthHeader } from './AuthHeader.component';
import { AuthTabs } from './AuthTabs.component';
import { LoginForm } from './LoginForm.component';
import { RegisterForm } from './RegisterForm.component';
import type { LoginFormData, RegisterFormData } from '../types';

interface AuthContainerProps {
  onLogin?: (data: LoginFormData) => void;
  onRegister?: (data: RegisterFormData) => void;
  onForgotPassword?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export const AuthContainer = memo<AuthContainerProps>(
  ({ onLogin, onRegister, onForgotPassword, isLoading = false, error }) => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

    const handleLogin = (data: LoginFormData) => {
      console.log('✅ Login completed successfully for:', data.email);
      onLogin?.(data);
    };

    const handleRegister = (data: RegisterFormData) => {
      console.log('✅ Registration completed successfully for:', data.email);
      onRegister?.(data);
    };

    const handleForgotPasswordClick = () => {
      console.log('Navigate to forgot password');
      onForgotPassword?.();
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 lg:p-12">
        <div className="max-w-md w-full">
          <AuthHeader isRegisterMode={activeTab === 'register'} />

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === 'login' && (
              <>
                <LoginForm
                  onSubmit={handleLogin}
                  isLoading={isLoading}
                  error={error || undefined}
                />

                <div className="mt-6 text-center">
                  <button
                    onClick={handleForgotPasswordClick}
                    className="text-sm text-java-orange hover:underline"
                  >
                    Zapomniałeś hasła?
                  </button>
                </div>
              </>
            )}

            {activeTab === 'register' && (
              <RegisterForm
                onSubmit={handleRegister}
                isLoading={isLoading}
                error={error || undefined}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

AuthContainer.displayName = 'AuthContainer';
