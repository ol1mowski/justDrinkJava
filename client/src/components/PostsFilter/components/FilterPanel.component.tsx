import { memo } from 'react'
import { CategoryFilter } from './CategoryFilter.component'
import { HashtagFilter } from './HashtagFilter.component'
import type { FilterOptions, HashtagDto } from '../types'

interface FilterPanelProps {
  filters: FilterOptions
  hashtags: HashtagDto[]
  categories: Array<{ id: number; name: string }>
  onFiltersChange: (filters: Partial<FilterOptions>) => void
}

export const FilterPanel = memo<FilterPanelProps>(({
  filters,
  hashtags,
  categories,
  onFiltersChange
}) => {
  const handleHashtagToggle = (hashtagName: string) => {
    const newHashtags = filters.hashtags.includes(hashtagName)
      ? filters.hashtags.filter(h => h !== hashtagName)
      : [...filters.hashtags, hashtagName]
    
    onFiltersChange({ hashtags: newHashtags })
  }

  const handleCategoryChange = (categoryName: string) => {
    const newCategory = filters.category === categoryName ? undefined : categoryName
    onFiltersChange({ category: newCategory })
  }

  return (
    <div className="mt-4 p-4 bg-java-light-gray/30 dark:bg-java-dark-surface/30 rounded-xl border border-java-light-gray/20 dark:border-java-dark-surface/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryFilter
          categories={categories}
          selectedCategory={filters.category}
          onCategoryChange={handleCategoryChange}
        />

        <HashtagFilter
          hashtags={hashtags}
          selectedHashtags={filters.hashtags}
          onHashtagToggle={handleHashtagToggle}
        />
      </div>
    </div>
  )
})

FilterPanel.displayName = 'FilterPanel' 