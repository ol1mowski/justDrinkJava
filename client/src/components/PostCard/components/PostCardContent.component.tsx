import { memo } from 'react'

interface PostCardContentProps {
  title: string
  description: string
  hashtags?: Array<{
    id: number
    name: string
    postCount: number
  }>
}

export const PostCardContent = memo<PostCardContentProps>(({ 
  title, 
  description, 
  hashtags 
}) => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-bold text-java-gray dark:text-java-dark-text mb-3 line-clamp-2 group-hover:text-java-orange transition-colors duration-200">
        {title}
      </h3>

      <p className="text-java-blue/90 dark:text-java-dark-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>

      {hashtags && hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {hashtags.slice(0, 3).map((hashtag) => (
            <span
              key={hashtag.id}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-java-blue/10 text-java-blue dark:bg-java-blue/20 dark:text-java-blue hover:bg-java-blue/20 transition-colors duration-200"
            >
              #{hashtag.name}
            </span>
          ))}
          {hashtags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-java-gray/60 dark:text-java-dark-text-secondary">
              +{hashtags.length - 3} więcej
            </span>
          )}
        </div>
      )}
    </div>
  )
})

PostCardContent.displayName = 'PostCardContent' 