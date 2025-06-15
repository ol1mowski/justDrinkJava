import { forwardRef, useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isPassword?: boolean
  showPasswordToggle?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    label,
    error,
    helperText,
    size = 'md',
    variant = 'default',
    leftIcon,
    rightIcon,
    isPassword = false,
    showPasswordToggle = false,
    type = 'text',
    disabled,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type
    
    const sizeClasses = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-3 text-sm',
      lg: 'h-11 px-4 text-base'
    }
    
    const variantClasses = {
      default: 'border border-gray-300 bg-white',
      filled: 'border-0 bg-gray-100'
    }

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={[
              'w-full rounded-lg transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-java-orange focus:border-transparent',
              'placeholder:text-gray-400',
              sizeClasses[size],
              variantClasses[variant],
              leftIcon && 'pl-10',
              (rightIcon || (isPassword && showPasswordToggle)) && 'pr-10',
              error && 'border-red-500 focus:ring-red-500',
              disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
              className
            ].filter(Boolean).join(' ')}
            {...props}
          />
          
          {(rightIcon || (isPassword && showPasswordToggle)) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isPassword && showPasswordToggle ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p className={[
            'text-sm',
            error ? 'text-red-600' : 'text-gray-500'
          ].join(' ')}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input' 