import { memo } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface FilterStatsProps {
  resultsCount: number
  activeFiltersCount: number
  onClearFilters: () => void
}

export const FilterStats = memo<FilterStatsProps>(({ 
  resultsCount, 
  activeFiltersCount, 
  onClearFilters 
}) => {
  return (
    <div className="mt-3 flex items-center justify-between">
      <p className="text-sm text-java-gray/70 dark:text-java-dark-text-secondary">
        Znaleziono <span className="font-semibold text-java-orange">{resultsCount}</span> postów
      </p>
      
      {activeFiltersCount > 0 && (
        <button
          onClick={onClearFilters}
          className="text-sm text-java-blue hover:text-java-orange transition-colors duration-200 flex items-center gap-1 cursor-pointer hover:underline"
        >
          <XMarkIcon className="w-4 h-4" />
          Wyczyść filtry
        </button>
      )}
    </div>
  )
})

FilterStats.displayName = 'FilterStats' 