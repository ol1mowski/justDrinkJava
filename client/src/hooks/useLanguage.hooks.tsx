import React, { useState, useEffect, useCallback } from 'react'

export type Language = 'pl' | 'en' | 'de'

export interface LanguageOption {
  code: Language
  name: string
  flag: React.ComponentType<{ className?: string }>
}

const PolishFlag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 12" fill="none">
    <rect width="16" height="6" fill="#ffffff" />
    <rect y="6" width="16" height="6" fill="#dc143c" />
  </svg>
)

const USFlag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 12" fill="none">
    <rect width="16" height="12" fill="#B22234" />
    <rect width="16" height="1" y="1" fill="#ffffff" />
    <rect width="16" height="1" y="3" fill="#ffffff" />
    <rect width="16" height="1" y="5" fill="#ffffff" />
    <rect width="16" height="1" y="7" fill="#ffffff" />
    <rect width="16" height="1" y="9" fill="#ffffff" />
    <rect width="16" height="1" y="11" fill="#ffffff" />
    <rect width="6" height="6" fill="#3C3B6E" />
  </svg>
)

const GermanFlag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 12" fill="none">
    <rect width="16" height="4" fill="#000000" />
    <rect y="4" width="16" height="4" fill="#dd0000" />
    <rect y="8" width="16" height="4" fill="#ffce00" />
  </svg>
)

export const languages: LanguageOption[] = [
  { code: 'pl', name: 'Polski', flag: PolishFlag },
  { code: 'en', name: 'English', flag: USFlag },
  { code: 'de', name: 'Deutsch', flag: GermanFlag },
]

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('pl')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && ['pl', 'en', 'de'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage)
    } else {
      const browserLang = navigator.language.split('-')[0]
      if (['pl', 'en', 'de'].includes(browserLang)) {
        setCurrentLanguage(browserLang as Language)
      }
    }
  }, [])

  const changeLanguage = useCallback((newLanguage: Language) => {
    setCurrentLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }, [])

  const getCurrentLanguageOption = useCallback(() => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0]
  }, [currentLanguage])

  return {
    currentLanguage,
    changeLanguage,
    getCurrentLanguageOption,
    languages
  }
} 