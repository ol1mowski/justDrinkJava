import { memo } from 'react'
import { ChartBarIcon } from '@heroicons/react/24/outline'
import type { Tag } from '../hooks/useHashtags.hook'
import { getTagStyles } from '../../../utils/tagStyles'

interface TagItemProps {
  tag: Tag
  index: number
}

export const TagItem = memo<TagItemProps>(({ tag, index }) => {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-3 flex-1">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-java-gray/10 dark:bg-java-dark-text/10 
                       flex items-center justify-center text-xs font-bold text-java-blue/90 dark:text-java-dark-text-secondary">
          {index + 1}
        </div>
        <button className={`
          inline-flex items-center gap-2 px-3 py-2 rounded-lg border font-medium text-sm
          transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
          cursor-pointer
          ${getTagStyles(tag.color)}
        `}>
          <span>#</span>
          <span>{tag.name}</span>
          {tag.trending && <ChartBarIcon className="w-3 h-3 text-current" />}
        </button>
      </div>
      <div className="flex-shrink-0 text-right">
        <span className="text-sm font-medium text-java-blue/90 dark:text-java-dark-text-secondary">
          {tag.count} postów
        </span>
      </div>
    </div>
  )
})

TagItem.displayName = 'TagItem' 