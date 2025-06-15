import { forwardRef } from 'react';
import { ExclamationCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isLoading?: boolean;
  showPasswordToggle?: boolean;
  onPasswordToggle?: () => void;
  showPassword?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ 
    label, 
    error, 
    isLoading, 
    showPasswordToggle, 
    onPasswordToggle, 
    showPassword,
    className = '',
    ...props 
  }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full px-3 py-2 border rounded-lg shadow-sm 
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
              dark:bg-gray-800 dark:border-gray-600 dark:text-white
              ${error 
                ? 'border-red-300 focus:ring-red-500' 
                : 'border-gray-300 hover:border-gray-400'
              }
              ${className}
            `}
            disabled={isLoading}
            type={showPasswordToggle ? (showPassword ? 'text' : 'password') : props.type}
            {...props}
          />
          
          {/* Password toggle button */}
          {showPasswordToggle && (
            <button
              type="button"
              onClick={onPasswordToggle}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          )}
          
          {/* Error icon */}
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <ExclamationCircleIcon className="h-4 w-4" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput'; 