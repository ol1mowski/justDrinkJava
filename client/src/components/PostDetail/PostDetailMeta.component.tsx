import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/24/outline'
import { memo } from 'react'

interface PostDetailMetaProps {
  authorName: string
  authorAvatarUrl?: string
  createdAt: string
  readTime: number
  formatDate: (date: string) => string
}

export const PostDetailMeta = memo(({ 
  authorName, 
  authorAvatarUrl, 
  createdAt, 
  readTime, 
  formatDate 
}: PostDetailMetaProps) => {
  const defaultAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8 text-java-gray">
      <div className="flex items-center gap-2">
        <img
          src={authorAvatarUrl || defaultAvatar}
          alt={authorName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-medium text-java-dark">
          {authorName}
        </span>
      </div>
      
      <div className="flex items-center gap-1">
        <CalendarDaysIcon className="w-4 h-4" />
        <span className="text-sm">{formatDate(createdAt)}</span>
      </div>
      
      <div className="flex items-center gap-1">
        <ClockIcon className="w-4 h-4" />
        <span className="text-sm">{readTime} min czytania</span>
      </div>
    </div>
  )
})

PostDetailMeta.displayName = 'PostDetailMeta' 