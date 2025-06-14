import { memo, useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import type { InputFieldProps } from '../types'

export const InputField = memo<InputFieldProps>(({ 
  label, 
  type, 
  placeholder, 
  value, 
  onChange, 
  icon,
  showPasswordToggle = false 
}) => {
  const [showPassword, setShowPassword] = useState(false)
  
  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="h-5 w-5 text-gray-400">
              {icon}
            </div>
          </div>
        )}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`block w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-900 placeholder-gray-500 focus:border-java-orange focus:outline-none focus:ring-1 focus:ring-java-orange transition-colors ${
            icon ? 'pl-10' : ''
          } ${showPasswordToggle ? 'pr-10' : ''}`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
      </div>
    </div>
  )
})

InputField.displayName = 'InputField' 