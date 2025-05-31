import { memo } from 'react'
import { SearchBar } from './SearchBar.components'
import { ThemeSwitcher } from './ThemeSwitcher.components'
import { LanguageSwitcher } from './LanguageSwitcher.components'
import { LoginButton } from './LoginButton.components'

export const DesktopControls = memo(() => {
  return (
    <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
      <div className="w-80">
        <SearchBar />
      </div>
      <ThemeSwitcher />
      <LanguageSwitcher />
      <LoginButton />
    </div>
  )
})

DesktopControls.displayName = 'DesktopControls' 