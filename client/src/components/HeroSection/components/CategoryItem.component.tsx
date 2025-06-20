import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChartBarIcon } from '@heroicons/react/24/outline'
import type { CategoryTag } from '../hooks/useCategories.hook'
import { getTagStyles } from '../../../utils/tagStyles'

interface CategoryItemProps {
  tag: CategoryTag
  index: number
}

export const CategoryItem = memo<CategoryItemProps>(({ tag, index }) => {
  const navigate = useNavigate()

  const handleCategoryClick = () => {
    navigate(`/search?category=${encodeURIComponent(tag.name)}`)
  }

  return (
    <div 
      onClick={handleCategoryClick}
      className="flex items-center justify-between group cursor-pointer hover:bg-java-light-gray/50 p-2 rounded-lg transition-colors duration-200"
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-java-gray/10 
                       flex items-center justify-center text-xs font-bold text-java-blue/90">
          {index + 1}
        </div>
        <button className={`
          inline-flex items-center gap-2 px-3 py-2 rounded-lg border font-medium text-sm
          transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
          cursor-pointer
          ${getTagStyles(tag.color)}
        `}>
          <span>{tag.name}</span>
          {tag.trending && <ChartBarIcon className="w-3 h-3 text-current" />}
        </button>
      </div>
      <div className="flex-shrink-0 text-right">
        <span className="text-sm font-medium text-java-blue/90">
          {tag.count} postów
        </span>
      </div>
    </div>
  )
})

CategoryItem.displayName = 'CategoryItem' 