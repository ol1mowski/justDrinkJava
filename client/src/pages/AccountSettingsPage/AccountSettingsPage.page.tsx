import { memo } from 'react'
import { AccountSettingsContainer } from './components/AccountSettingsContainer.component'

export const AccountSettingsPage = memo(() => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-java-brown via-slate-50 to-java-blue/10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Ustawienia konta
            </h1>
            <p className="text-gray-600">
              Zarządzaj swoim kontem i preferencjami
            </p>
          </div>
          
          <AccountSettingsContainer />
        </div>
      </div>
    </div>
  )
})

AccountSettingsPage.displayName = 'AccountSettingsPage' 