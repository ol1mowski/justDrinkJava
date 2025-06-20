import { memo } from 'react'
import { CategoryFilter } from './CategoryFilter.component'
import type { FilterOptions } from '../types'

interface FilterPanelProps {
  filters: FilterOptions
  categories: Array<{ id: number; name: string }>
  onFiltersChange: (filters: Partial<FilterOptions>) => void
}

export const FilterPanel = memo<FilterPanelProps>(({
  filters,
  categories,
  onFiltersChange
}) => {
  const handleCategoryChange = (categoryName: string) => {
    const newCategory = filters.category === categoryName ? undefined : categoryName
    onFiltersChange({ category: newCategory })
  }

  return (
    <div className="mt-4 p-4 bg-java-light-gray/30 dark:bg-java-dark-surface/30 rounded-xl border border-java-light-gray/20 dark:border-java-dark-surface/50">
      <CategoryFilter
        categories={categories}
        selectedCategory={filters.category}
        onCategoryChange={handleCategoryChange}
      />
    </div>
  )
})

FilterPanel.displayName = 'FilterPanel' 