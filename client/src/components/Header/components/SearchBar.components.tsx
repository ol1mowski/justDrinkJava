import { memo } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '../../../hooks/useLanguage.hooks'
import { useTranslations } from '../../../translations'

export const SearchBar = memo(() => {
  const { currentLanguage } = useLanguage()
  const t = useTranslations(currentLanguage)

  return (
    <div className="relative group w-full">
      <div className="relative">
        <input
          type="text"
          name="search"
          placeholder={t.search.placeholder}
          className="w-full pl-10 pr-4 py-2 border-2 rounded-lg
                     bg-java-white dark:bg-java-dark-surface backdrop-blur-sm 
                     transition-all duration-300 focus:ring-2 focus:ring-java-orange/50 
                     text-sm outline-none border-java-gray/20 dark:border-java-dark-text/20
                     hover:border-java-orange/50 focus:border-java-orange 
                     text-java-gray dark:text-java-dark-text
                     placeholder:text-java-gray/50 dark:placeholder:text-java-dark-text-secondary"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                       w-4 h-4 text-java-gray/60 dark:text-java-dark-text-secondary" />
      </div>
    </div>
  )
})

SearchBar.displayName = 'SearchBar' 