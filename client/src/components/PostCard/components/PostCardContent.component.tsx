import { memo } from 'react'

interface PostCardContentProps {
  title: string
  description: string
}

export const PostCardContent = memo<PostCardContentProps>(({ 
  title, 
  description
}) => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-bold text-java-gray dark:text-java-dark-text mb-3 line-clamp-2 group-hover:text-java-orange transition-colors duration-200">
        {title}
      </h3>

      <p className="text-java-blue/90 dark:text-java-dark-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
        {description}
      </p>
    </div>
  )
})

PostCardContent.displayName = 'PostCardContent' 