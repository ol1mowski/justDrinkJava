import { memo } from 'react'
import { ProfileSection } from './ProfileSection.component'
import { SecuritySection } from './SecuritySection.component'
import { PreferencesSection } from './PreferencesSection.component'
import { DangerZoneSection } from './DangerZoneSection.component'

export const AccountSettingsContainer = memo(() => {
  return (
    <div className="space-y-8">
      <ProfileSection />
      <SecuritySection />
      <PreferencesSection />
      <DangerZoneSection />
    </div>
  )
})

AccountSettingsContainer.displayName = 'AccountSettingsContainer' 