import { memo } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export const SearchInput = memo<SearchInputProps>(({ value, onChange }) => {
  return (
    <div className="mb-8">
      <div className="relative max-w-2xl mx-auto">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Wpisz frazę do wyszukania..."
          className="w-full pl-12 pr-4 py-4 text-lg border-2 rounded-xl border-java-gray/20
                     bg-white dark:bg-java-dark-surface backdrop-blur-sm 
                     transition-all duration-300 focus:ring-2 focus:ring-java-orange/50 
                     outline-none shadow-lg
                     dark:border-java-dark-text/20
                     hover:border-java-orange/50 dark:hover:border-java-orange/50 
                     focus:border-java-orange 
                     text-gray-800 dark:text-java-dark-text
                     placeholder:text-gray-500 dark:placeholder:text-java-dark-text-secondary"
        />
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                       w-6 h-6 text-gray-500 dark:text-java-dark-text-secondary" />
      </div>
    </div>
  )
})

SearchInput.displayName = 'SearchInput' 