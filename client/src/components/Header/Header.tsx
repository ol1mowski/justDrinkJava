import { memo } from 'react'
import { BrandLogo } from './components/BrandLogo.components'
import { DesktopNavigation } from './components/DesktopNavigation.components'
import { DesktopControls } from './components/DesktopControls.components'
import { MobileControls } from './components/MobileControls.components'

export const Header = memo(() => {
  return (
    <>
      <header className="sticky top-0 z-40 transition-all duration-300
                        bg-java-white dark:bg-java-dark-bg backdrop-blur-md 
                        border-b border-java-gray/20 dark:border-java-dark-text/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <BrandLogo />
            <DesktopNavigation />
            <DesktopControls />
            <MobileControls />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px 
                       bg-gradient-to-r from-transparent via-java-orange/30 to-transparent" />
      </header>
    </>
  )
})

Header.displayName = 'Header'

export default Header 