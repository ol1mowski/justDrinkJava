import { memo } from 'react'
import type { TabSwitcherProps } from '../types'

export const TabSwitcher = memo<TabSwitcherProps>(({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login' as const, label: 'Logowanie' },
    { id: 'register' as const, label: 'Rejestracja' },
    { id: 'reset' as const, label: 'Reset hasła' }
  ]

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === tab.id
              ? 'bg-white text-java-orange shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
})

TabSwitcher.displayName = 'TabSwitcher' 