import { memo } from 'react';
import { AccountSettingsPage as AccountSettingsPageComponent } from '../../components/AccountSettingsPage/AccountSettingsPage.component';

export const AccountSettingsPage = memo(() => {
  return <AccountSettingsPageComponent />;
});

AccountSettingsPage.displayName = 'AccountSettingsPage';
