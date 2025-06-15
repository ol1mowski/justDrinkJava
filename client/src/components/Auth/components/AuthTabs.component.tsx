import { memo } from 'react'
import type { AuthTabsProps } from '../types'

export const AuthTabs = memo<AuthTabsProps>(({ activeTab, onTabChange }) => (
  <div className="flex mb-6">
    <button
      onClick={() => onTabChange('login')}
      className={[
        'flex-1 py-2 px-4 text-sm font-medium rounded-l-lg transition-colors duration-200',
        activeTab === 'login'
          ? 'bg-java-orange text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      ].join(' ')}
    >
      Logowanie
    </button>
    <button
      onClick={() => onTabChange('register')}
      className={[
        'flex-1 py-2 px-4 text-sm font-medium rounded-r-lg transition-colors duration-200',
        activeTab === 'register'
          ? 'bg-java-orange text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      ].join(' ')}
    >
      Rejestracja
    </button>
  </div>
))

AuthTabs.displayName = 'AuthTabs' 