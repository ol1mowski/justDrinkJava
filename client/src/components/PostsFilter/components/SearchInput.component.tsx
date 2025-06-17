import { memo } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export const SearchInput = memo<SearchInputProps>(({ value, onChange }) => {
  return (
    <div className="flex-1 relative">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-java-orange" />
        <input
          type="text"
          placeholder="Szukaj postów, kategorii, tagów..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-java-light-gray/30 dark:border-java-dark-surface/50 bg-java-white dark:bg-java-dark-surface text-java-gray dark:text-java-dark-text placeholder-java-gray/50 dark:placeholder-java-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-java-orange/50 focus:border-java-orange transition-all duration-200 hover:border-java-orange/50 cursor-text"
        />
      </div>
    </div>
  )
})

SearchInput.displayName = 'SearchInput' 