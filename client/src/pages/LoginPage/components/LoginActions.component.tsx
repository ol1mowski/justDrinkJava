import { memo } from 'react'
import type { LoginActionsProps } from '../types'

export const LoginActions = memo<LoginActionsProps>(({ 
  onRegisterClick, 
  onForgotPasswordClick 
}) => (
  <div className="space-y-4">
    {/* Divider */}
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">lub</span>
      </div>
    </div>

    {/* Actions */}
    <div className="flex flex-col space-y-3">
      <button
        onClick={onRegisterClick}
        className="w-full text-center py-3 px-4 border border-java-orange text-java-orange font-medium rounded-lg hover:bg-java-orange hover:text-white transition-colors duration-200"
      >
        Utwórz nowe konto
      </button>
      
      <button
        onClick={onForgotPasswordClick}
        className="text-center text-sm text-gray-600 hover:text-java-orange transition-colors duration-200"
      >
        Zapomniałeś hasła?
      </button>
    </div>
  </div>
))

LoginActions.displayName = 'LoginActions' 