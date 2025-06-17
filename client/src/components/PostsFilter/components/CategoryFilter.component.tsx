import { memo } from 'react'
import { FolderIcon } from '@heroicons/react/24/outline'

interface CategoryFilterProps {
  categories: Array<{ id: number; name: string }>
  selectedCategory?: string
  onCategoryChange: (categoryName: string) => void
}

export const CategoryFilter = memo<CategoryFilterProps>(({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div>
      <h4 className="flex items-center gap-2 font-semibold text-java-gray dark:text-java-dark-text mb-3">
        <FolderIcon className="w-5 h-5 text-java-orange" />
        Kategorie
      </h4>
      <div className="space-y-2">
        {categories.map(category => (
          <label
            key={category.id}
            className="flex items-center gap-3 cursor-pointer group hover:bg-java-orange/5 p-2 rounded-lg transition-all duration-200"
          >
            <input
              type="radio"
              name="category"
              checked={selectedCategory === category.name}
              onChange={() => onCategoryChange(category.name)}
              className="w-4 h-4 text-java-orange focus:ring-java-orange/50 border-java-gray/30 dark:border-java-dark-text-secondary cursor-pointer"
            />
            <span className="text-sm text-java-gray dark:text-java-dark-text group-hover:text-java-orange transition-colors duration-200">
              {category.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
})

CategoryFilter.displayName = 'CategoryFilter' 