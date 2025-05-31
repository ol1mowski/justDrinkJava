import { memo } from 'react'
import { UserIcon } from '@heroicons/react/24/outline'
import { useTranslations } from '../../../translations'
import { useLanguage } from '../../../hooks/useLanguage.hooks'


export const LoginButton = memo(() => {
  const { currentLanguage } = useLanguage()
  const t = useTranslations(currentLanguage)

  return (
    <a
      href="/login"
      className="relative group focus:outline-none"
    >
      <div className="flex items-center space-x-2 px-4 py-2 rounded-lg
                     bg-java-orange text-java-white font-medium text-sm
                     transition-all duration-300 transform
                     hover:scale-105 hover:bg-java-orange/90
                     whitespace-nowrap focus:outline-none">
        <UserIcon className="w-4 h-4" />
        <span>{t.navigation.login}</span>
      </div>
    </a>
  )
})

LoginButton.displayName = 'LoginButton' 