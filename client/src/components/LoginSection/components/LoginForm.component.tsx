import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { FormInput } from '../../ui/FormInput.component';
import { useAuth } from '../hooks/useAuth.hook';
import { loginSchema, type LoginFormData } from '../types/validation.schemas';
import type { ApiError } from '../types/auth.types';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export const LoginForm = ({ onSuccess, onSwitchToRegister }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange', // Walidacja w czasie rzeczywistym
  });

  // Obserwuj zmiany w polach dla real-time feedback
  const watchedFields = watch();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setApiError(null);
      await login(data);
      onSuccess?.();
    } catch (error) {
      const apiErr = error as ApiError;
      setApiError(apiErr.message);
      
      // Wyświetl błędy pól jeśli są dostępne
      if (apiErr.errors) {
        console.error('Field errors:', apiErr.errors);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Zaloguj się
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Witaj z powrotem! Zaloguj się do swojego konta.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Global API Error */}
          {apiError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
            >
              <p className="text-red-800 dark:text-red-200 text-sm">{apiError}</p>
            </motion.div>
          )}

          {/* Email Field */}
          <FormInput
            {...register('email')}
            label="Email"
            type="email"
            placeholder="twoj@email.com"
            error={errors.email?.message}
            isLoading={isLoading}
          />

          {/* Password Field */}
          <FormInput
            {...register('password')}
            label="Hasło"
            placeholder="Wprowadź hasło"
            error={errors.password?.message}
            isLoading={isLoading}
            showPasswordToggle
            showPassword={showPassword}
            onPasswordToggle={() => setShowPassword(!showPassword)}
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading || !isValid || !isDirty}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full py-3 px-4 rounded-lg font-medium text-white
              transition-all duration-200
              ${isLoading || !isValid || !isDirty
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200'
              }
            `}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logowanie...
              </div>
            ) : (
              'Zaloguj się'
            )}
          </motion.button>

          {/* Real-time validation feedback */}
          {isDirty && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {isValid ? (
                <span className="text-green-600 dark:text-green-400">✓ Formularz jest poprawny</span>
              ) : (
                <span>Uzupełnij wszystkie pola poprawnie</span>
              )}
            </div>
          )}
        </form>

        {/* Switch to Register */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Nie masz konta?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
            >
              Zarejestruj się
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}; 