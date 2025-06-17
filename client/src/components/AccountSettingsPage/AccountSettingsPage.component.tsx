import { memo } from 'react'
import { AccountSettingsContainer } from './components/AccountSettingsContainer.component'
import { ErrorBoundaryWrapper } from '../ui'

export const AccountSettingsPage = memo(() => {
  return (
    <ErrorBoundaryWrapper
      title="Błąd ustawień konta"
      message="Wystąpił problem podczas ładowania ustawień konta"
    >
      <div className="min-h-screen bg-gradient-to-br from-java-brown via-slate-50 to-java-blue/10 dark:from-java-dark-bg dark:via-java-dark-bg dark:to-java-dark-surface">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-java-dark-text mb-2">
                Ustawienia konta
              </h1>
              <p className="text-gray-600 dark:text-java-dark-text-secondary">
                Zarządzaj swoim kontem
              </p>
            </div>
            
            <AccountSettingsContainer />
          </div>
        </div>
      </div>
    </ErrorBoundaryWrapper>
  )
})

AccountSettingsPage.displayName = 'AccountSettingsPage' 