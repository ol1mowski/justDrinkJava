import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginForm } from './components/LoginForm.component';
import { RegisterForm } from './components/RegisterForm.component';

type AuthMode = 'login' | 'register';

interface AuthSectionProps {
  onAuthSuccess?: () => void;
  defaultMode?: AuthMode;
}

export const AuthSection = ({ onAuthSuccess, defaultMode = 'login' }: AuthSectionProps) => {
  const [authMode, setAuthMode] = useState<AuthMode>(defaultMode);

  const handleAuthSuccess = () => {
    console.log(`${authMode === 'login' ? 'Login' : 'Registration'} successful!`);
    onAuthSuccess?.();
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const switchToRegister = () => {
    setDirection(1);
    setAuthMode('register');
  };

  const switchToLogin = () => {
    setDirection(-1);
    setAuthMode('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={authMode}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            {authMode === 'login' ? (
              <LoginForm 
                onSuccess={handleAuthSuccess}
                onSwitchToRegister={switchToRegister}
              />
            ) : (
              <RegisterForm 
                onSuccess={handleAuthSuccess}
                onSwitchToLogin={switchToLogin}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            <div className="flex">
              <button
                onClick={() => authMode !== 'login' && switchToLogin()}
                className={`
                  px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                  ${authMode === 'login'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }
                `}
              >
                Logowanie
              </button>
              <button
                onClick={() => authMode !== 'register' && switchToRegister()}
                className={`
                  px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                  ${authMode === 'register'
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }
                `}
              >
                Rejestracja
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 