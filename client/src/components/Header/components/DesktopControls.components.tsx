import { memo } from 'react'
import { SearchBar } from './SearchBar.components'
import { ThemeSwitcher } from './ThemeSwitcher.components'
import { LanguageSwitcher } from './LanguageSwitcher.components'
import { LoginButton } from './LoginButton.components'
import { UserMenu } from './UserMenu.component'
import { useAuth } from '../../../hooks/auth/useAuth.hook'

export const DesktopControls = memo(() => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
      <div className="w-80">
        <SearchBar />
      </div>
      <ThemeSwitcher />
      <LanguageSwitcher />
      {isAuthenticated ? <UserMenu /> : <LoginButton />}
    </div>
  )
})

DesktopControls.displayName = 'DesktopControls' 