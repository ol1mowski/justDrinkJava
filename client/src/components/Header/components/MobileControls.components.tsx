import { memo } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { ThemeSwitcher } from './ThemeSwitcher.components'
import { LanguageSwitcher } from './LanguageSwitcher.components'

export const MobileControls = memo(() => {
  return (
    <div className="lg:hidden flex items-center space-x-2">
      <ThemeSwitcher />
      <LanguageSwitcher />
      <button
        className="relative p-3 rounded-xl
                  bg-java-light-gray/50 dark:bg-java-dark-surface/50 
                  hover:bg-java-orange/10 transition-all duration-300 
                  transform hover:scale-105 border border-java-gray/10 
                  dark:border-java-dark-text/10 hover:border-java-orange/20
                  focus:outline-none"
      >
        <Bars3Icon className="w-6 h-6 text-java-gray dark:text-java-dark-text" />
      </button>
    </div>
  )
})

MobileControls.displayName = 'MobileControls' 