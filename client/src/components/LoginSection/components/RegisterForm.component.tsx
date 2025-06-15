import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { FormInput } from '../../ui/FormInput.component';
import { useAuth } from '../hooks/useAuth.hook';
import { registerSchema, type RegisterFormData } from '../types/validation.schemas';
import type { ApiError } from '../types/auth.types';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export const RegisterForm = ({ onSuccess, onSwitchToLogin }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { register: registerUser, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange', // Walidacja w czasie rzeczywistym
  });

  // Obserwuj zmiany w polach
  const watchedFields = watch();
  const watchedPassword = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setApiError(null);
      setFieldErrors({});
      await registerUser(data);
      onSuccess?.();
    } catch (error) {
      const apiErr = error as ApiError;
      setApiError(apiErr.message);
      
      // Ustaw błędy pól jeśli są dostępne
      if (apiErr.errors) {
        setFieldErrors(apiErr.errors);
      }
    }
  };

  // Funkcja do sprawdzania siły hasła
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = watchedPassword ? getPasswordStrength(watchedPassword) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Załóż konto
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Dołącz do naszej społeczności już dziś!
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

          {/* First Name */}
          <FormInput
            {...register('firstName')}
            label="Imię"
            placeholder="Twoje imię"
            error={errors.firstName?.message || fieldErrors.firstName}
            isLoading={isLoading}
          />

          {/* Last Name */}
          <FormInput
            {...register('lastName')}
            label="Nazwisko"
            placeholder="Twoje nazwisko"
            error={errors.lastName?.message || fieldErrors.lastName}
            isLoading={isLoading}
          />

          {/* Email */}
          <FormInput
            {...register('email')}
            label="Email"
            type="email"
            placeholder="twoj@email.com"
            error={errors.email?.message || fieldErrors.email}
            isLoading={isLoading}
          />

          {/* Password with strength indicator */}
          <div>
            <FormInput
              {...register('password')}
              label="Hasło"
              placeholder="Minimum 8 znaków"
              error={errors.password?.message || fieldErrors.password}
              isLoading={isLoading}
              showPasswordToggle
              showPassword={showPassword}
              onPasswordToggle={() => setShowPassword(!showPassword)}
            />
            
            {/* Password Strength Indicator */}
            {watchedPassword && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2"
              >
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                        level <= passwordStrength
                          ? passwordStrength <= 2
                            ? 'bg-red-500'
                            : passwordStrength <= 3
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                          : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Siła hasła: {' '}
                  <span className={
                    passwordStrength <= 2
                      ? 'text-red-600'
                      : passwordStrength <= 3
                      ? 'text-yellow-600'
                      : 'text-green-600'
                  }>
                    {passwordStrength <= 2 ? 'Słabe' : passwordStrength <= 3 ? 'Średnie' : 'Silne'}
                  </span>
                </p>
              </motion.div>
            )}
          </div>

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
                : 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200'
              }
            `}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Rejestracja...
              </div>
            ) : (
              'Załóż konto'
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

        {/* Switch to Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Masz już konto?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
            >
              Zaloguj się
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}; 