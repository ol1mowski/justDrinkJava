import { memo } from 'react'

interface PostBadgeProps {
  text?: string
  className?: string
}

export const PostBadge = memo<PostBadgeProps>(({ 
  text = "✨ Najnowszy post",
  className = ""
}) => {
  return (
    <div className={`absolute top-4 left-4 z-10 ${className}`}>
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                      bg-java-orange text-white shadow-lg">
        {text}
      </span>
    </div>
  )
})

PostBadge.displayName = 'PostBadge' 