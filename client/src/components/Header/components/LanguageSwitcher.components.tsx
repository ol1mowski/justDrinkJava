import { memo, useState, useEffect, useRef } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../../hooks/useLanguage.hooks'

export const LanguageSwitcher = memo(() => {
  const { currentLanguage, changeLanguage, getCurrentLanguageOption, languages } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentOption = getCurrentLanguageOption()
  const CurrentFlag = currentOption.flag

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
        className="flex items-center space-x-2 p-2 rounded-lg
                  cursor-pointer
                  transition-all duration-200 focus:outline-none group"
        aria-label="Change language"
      >
        <CurrentFlag className="w-5 h-3 rounded-sm" />
        <span className="text-sm font-medium text-java-gray dark:text-java-dark-text 
                        group-hover:text-java-orange transition-colors hidden sm:block">
          {currentOption.code.toUpperCase()}
        </span>
        <ChevronDownIcon className={`w-4 h-4 text-java-gray dark:text-java-dark-text 
                                   group-hover:text-java-orange transition-all duration-200
                                   ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 z-50
                       bg-java-white dark:bg-java-dark-surface
                       border border-java-gray/10 dark:border-java-dark-text/10
                       rounded-xl shadow-lg backdrop-blur-md overflow-hidden">
          {languages.map((lang) => {
            const FlagComponent = lang.flag
            return (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left
                          hover:bg-java-light-gray/50 dark:hover:bg-java-orange/10 cursor-pointer
                          transition-all duration-200
                          ${currentLanguage === lang.code 
                            ? 'text-java-orange bg-java-orange/5 dark:bg-java-orange/10' 
                            : 'text-java-gray dark:text-java-dark-text'
                          }`}
              >
                <FlagComponent className="w-6 h-4 rounded-sm" />
                <span className="text-sm font-medium">{lang.name}</span>
                {currentLanguage === lang.code && (
                  <div className="ml-auto w-2 h-2 bg-java-orange rounded-full" />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
})

LanguageSwitcher.displayName = 'LanguageSwitcher' 