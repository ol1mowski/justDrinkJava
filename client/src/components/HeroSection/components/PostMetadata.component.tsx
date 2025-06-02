import { memo } from 'react'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import type { CategoryData } from '../../../utils/api'

interface PostMetadataProps {
  category?: CategoryData | null
  createdAt: string
  readTimeFormatted: string
}

export const PostMetadata = memo<PostMetadataProps>(({ 
  category, 
  createdAt, 
  readTimeFormatted 
}) => {
  return (
    <div className="flex items-center gap-4 mb-4 text-sm text-java-blue/90 dark:text-java-dark-text-secondary">
      <span className="inline-flex items-center px-2 py-1 rounded-md bg-java-blue/10 text-java-blue font-medium">
        {category ? category.name : 'Ogólne'}
      </span>
      <div className="flex items-center gap-1">
        <CalendarIcon className="w-4 h-4" />
        <time dateTime={createdAt}>
          {new Date(createdAt).toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </div>
      <div className="flex items-center gap-1">
        <ClockIcon className="w-4 h-4" />
        <span>{readTimeFormatted}</span>
      </div>
    </div>
  )
})

PostMetadata.displayName = 'PostMetadata' 