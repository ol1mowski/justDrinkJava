import { memo } from 'react'

interface PostContentProps {
  title: string
  description: string
}

export const PostContent = memo<PostContentProps>(({ title, description }) => {
  return (
    <>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-java-gray dark:text-java-dark-text 
                    mb-4 group-hover:text-java-orange transition-colors duration-300 line-clamp-2">
        {title}
      </h2>

      <p className="text-java-blue/90 dark:text-java-dark-text-secondary mb-6 leading-relaxed line-clamp-3">
        {description}
      </p>
    </>
  )
})

PostContent.displayName = 'PostContent' 