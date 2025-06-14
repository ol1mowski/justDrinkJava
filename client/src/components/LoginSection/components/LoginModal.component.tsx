import { memo } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { TabSwitcher } from './TabSwitcher.component'
import { LoginForm } from './LoginForm.component'
import { useTabSwitcher } from '../hooks/useTabSwitcher.hook'
import type { LoginFormData } from '../types'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export const LoginModal = memo<LoginModalProps>(({ isOpen, onClose }) => {
  const { activeTab, switchTab } = useTabSwitcher('login')

  const handleLogin = (data: LoginFormData) => {
    console.log('Login data:', data)
    // Handle login logic here
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-java-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">JS</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">CodeLinesJS</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Zaloguj się</h3>
            <p className="text-gray-600">
              Wprowadź swoje dane aby uzyskać dostęp do konta
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="mb-6">
            <TabSwitcher activeTab={activeTab} onTabChange={switchTab} />
          </div>

          {/* Form Content */}
          {activeTab === 'login' && (
            <LoginForm onSubmit={handleLogin} />
          )}
          
          {activeTab === 'register' && (
            <div className="text-center py-8 text-gray-500">
              Formularz rejestracji - w budowie
            </div>
          )}
          
          {activeTab === 'reset' && (
            <div className="text-center py-8 text-gray-500">
              Reset hasła - w budowie
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

LoginModal.displayName = 'LoginModal' 