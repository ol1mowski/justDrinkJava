import { memo } from 'react'

export const SearchHeader = memo(() => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-java-dark-text mb-4">
        🔍 Wyszukiwanie postów
      </h1>
      <p className="text-lg text-gray-600 dark:text-java-dark-text-secondary">
        Znajdź interesujące Cię artykuły i porady
      </p>
    </div>
  )
})

SearchHeader.displayName = 'SearchHeader' 