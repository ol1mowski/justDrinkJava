import { memo, useState, useEffect, useRef } from 'react'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { useTheme, type ThemeMode } from '../../../hooks/useTheme.hooks'
import { useLanguage } from '../../../hooks/useLanguage.hooks'
import { useTranslations } from '../../../translations'

export const ThemeSwitcher = memo(() => {
  const { theme, changeTheme } = useTheme()
  const { currentLanguage } = useLanguage()
  const t = useTranslations(currentLanguage)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const themeOptions: { mode: ThemeMode; icon: React.ComponentType<any>; label: string }[] = [
    { mode: 'light', icon: SunIcon, label: t.theme.light },
    { mode: 'dark', icon: MoonIcon, label: t.theme.dark },
    { mode: 'system', icon: ComputerDesktopIcon, label: t.theme.system },
  ]

  const currentThemeOption = themeOptions.find(option => option.mode === theme) || themeOptions[0]
  const CurrentIcon = currentThemeOption.icon

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg
                  transition-all duration-200 focus:outline-none group"
        aria-label="Change theme"
      >
        <CurrentIcon className="w-5 h-5 text-java-gray dark:text-java-dark-text 
                             group-hover:text-java-orange transition-colors cursor-pointer" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 z-50
                       bg-java-white dark:bg-java-dark-surface
                       border border-java-gray/10 dark:border-java-dark-text/10
                       rounded-xl shadow-lg backdrop-blur-md">
          {themeOptions.map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => {
                changeTheme(mode)
                setIsOpen(false)
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left
                        hover:bg-java-light-gray/50 dark:hover:bg-java-orange/10 cursor-pointer
                        transition-all duration-200 first:rounded-t-xl last:rounded-b-xl
                        ${theme === mode 
                          ? 'text-java-orange bg-java-orange/5 dark:bg-java-orange/10' 
                          : 'text-java-gray dark:text-java-dark-text'
                        }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{label}</span>
              {theme === mode && (
                <div className="ml-auto w-2 h-2 bg-java-orange rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
})

ThemeSwitcher.displayName = 'ThemeSwitcher' 