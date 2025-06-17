import { motion } from 'framer-motion'
import { usePostContentByPostId } from '../../hooks/usePostContent.hook'
import { PostContentRenderer } from './PostContentRenderer.component'
import { PostContentSkeleton } from './PostContentSkeleton.component'
import { PostContentError } from './PostContentError.component'

interface PostContentContainerProps {
  postId: number
  className?: string
}

export const PostContentContainer = ({ 
  postId, 
  className = '',
}: PostContentContainerProps) => {
  const { content, isLoading, isError, error, refetch } = usePostContentByPostId(postId)

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={className}
      >
        <PostContentSkeleton />
      </motion.div>
    )
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={className}
      >
        <PostContentError 
          error={error} 
          onRetry={refetch}
          className="my-8"
        />
        

      </motion.div>
    )
  }

  if (!content) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={className}
      >
        <div className="text-center py-8 text-gray-500">
          <p>Brak zawartości dla tego posta.</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <PostContentRenderer content={content.content} />
    </motion.div>
  )
} 