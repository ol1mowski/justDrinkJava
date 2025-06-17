import { memo } from 'react'
import type { SortOption } from '../types'

interface SortSelectProps {
  value: SortOption
  onChange: (sort: SortOption) => void
}

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: 'newest', label: 'Najnowsze' },
  { value: 'oldest', label: 'Najstarsze' },
  { value: 'readTime', label: 'Czas czytania' },
  { value: 'title', label: 'Alfabetycznie' }
]

export const SortSelect = memo<SortSelectProps>(({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="px-4 py-3 rounded-xl border border-java-light-gray/30 dark:border-java-dark-surface/50 bg-java-white dark:bg-java-dark-surface text-java-gray dark:text-java-dark-text focus:outline-none focus:ring-2 focus:ring-java-orange/50 focus:border-java-orange transition-all duration-200 hover:border-java-orange/50 hover:shadow-md cursor-pointer"
    >
      {sortOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
})

SortSelect.displayName = 'SortSelect' 