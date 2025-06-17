import { memo } from 'react'
import { UserIcon } from '@heroicons/react/24/outline'

interface PostCardFooterProps {
  user: {
    id: number
    username: string
    avatarUrl?: string
  }
  createdAt: string
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const PostCardFooter = memo<PostCardFooterProps>(({ user, createdAt }) => {
  return (
    <div className="px-6 pb-6">
      <div className="flex items-center justify-between pt-4 border-t border-java-light-gray/20 dark:border-java-dark-surface/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-java-orange/20 rounded-full flex items-center justify-center">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <UserIcon className="w-4 h-4 text-java-orange" />
            )}
          </div>
          <span className="text-sm font-medium text-java-gray dark:text-java-dark-text">
            {user.username}
          </span>
        </div>

        <span className="text-xs text-java-gray/60 dark:text-java-dark-text-secondary">
          {formatDate(createdAt)}
        </span>
      </div>
    </div>
  )
})

PostCardFooter.displayName = 'PostCardFooter'