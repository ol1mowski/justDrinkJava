import { memo, useState } from 'react';
import { AuthHeader } from './AuthHeader.component';
import { AuthTabs } from './AuthTabs.component';
import { LoginForm } from './LoginForm.component';
import { RegisterForm } from './RegisterForm.component';
import { SocialLogin } from './SocialLogin.component';
import type { LoginFormData, RegisterFormData } from '../types';

interface AuthContainerProps {
  onLogin?: (data: LoginFormData) => void;
  onRegister?: (data: RegisterFormData) => void;
  onGoogleLogin?: (user: any, token: string) => Promise<void>;
  onGithubLogin?: () => void;
  onForgotPassword?: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export const AuthContainer = memo<AuthContainerProps>(
  ({
    onLogin,
    onRegister,
    onGoogleLogin,
    onGithubLogin,
    onForgotPassword,
    isLoading = false,
    error,
  }) => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

    const handleLogin = (data: LoginFormData) => {
      console.log('✅ Login completed successfully for:', data.email);
      onLogin?.(data);
    };

    const handleRegister = (data: RegisterFormData) => {
      console.log('✅ Registration completed successfully for:', data.email);
      onRegister?.(data);
    };

    const handleGoogleLogin = async (user: any, token: string) => {
      console.log('Google login');
      await onGoogleLogin?.(user, token);
    };

    const handleGithubLogin = () => {
      console.log('GitHub login');
      onGithubLogin?.();
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
                <SocialLogin
                  onGoogleLogin={handleGoogleLogin}
                  onGithubLogin={handleGithubLogin}
                  isLoading={isLoading}
                />

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      lub zaloguj się emailem
                    </span>
                  </div>
                </div>

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

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              {activeTab === 'register' ? 'Rejestrując się' : 'Logując się'},
              akceptujesz nasze{' '}
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
    );
  }
);

AuthContainer.displayName = 'AuthContainer';
