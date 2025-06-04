import { memo } from 'react'
import { ClockIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline'
import type { PostDTO } from '../hooks/usePosts.hook'

interface PostCardProps {
  post: PostDTO
  onClick?: (post: PostDTO) => void
}

export const PostCard = memo<PostCardProps>(({ post }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleClick = () => {
    console.log(post)
  }

  return (
    <article
      className="group bg-java-white dark:bg-java-dark-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-java-light-gray/20 dark:border-java-dark-surface/50"
      onClick={handleClick}
    >
      <div className="relative h-48 bg-gradient-to-br from-java-orange/10 to-java-blue/10 overflow-hidden">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-java-orange/20 rounded-full flex items-center justify-center">
              <TagIcon className="w-8 h-8 text-java-orange" />
            </div>
          </div>
        )}
        
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-java-orange text-white backdrop-blur-sm">
            {post.category.name}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-java-dark-surface/90 text-java-gray dark:text-java-dark-text backdrop-blur-sm">
            <ClockIcon className="w-3 h-3 text-java-orange" />
            <span className="text-java-orange">{post.readTime} min</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-java-gray dark:text-java-dark-text mb-3 line-clamp-2 group-hover:text-java-orange transition-colors duration-200">
          {post.title}
        </h3>

        <p className="text-java-blue/90 dark:text-java-dark-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
          {post.description}
        </p>

        {post.hashtags && post.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.hashtags.slice(0, 3).map((hashtag) => (
              <span
                key={hashtag.id}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-java-blue/10 text-java-blue dark:bg-java-blue/20 dark:text-java-blue hover:bg-java-blue/20 transition-colors duration-200"
              >
                #{hashtag.name}
              </span>
            ))}
            {post.hashtags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-java-gray/60 dark:text-java-dark-text-secondary">
                +{post.hashtags.length - 3} więcej
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-java-light-gray/20 dark:border-java-dark-surface/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-java-orange/20 rounded-full flex items-center justify-center">
              {post.user.avatarUrl ? (
                <img
                  src={post.user.avatarUrl}
                  alt={post.user.username}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <UserIcon className="w-4 h-4 text-java-orange" />
              )}
            </div>
            <span className="text-sm font-medium text-java-gray dark:text-java-dark-text">
              {post.user.username}
            </span>
          </div>

          <span className="text-xs text-java-gray/60 dark:text-java-dark-text-secondary">
            {formatDate(post.createdAt)}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-java-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </article>
  )
})

PostCard.displayName = 'PostCard' 