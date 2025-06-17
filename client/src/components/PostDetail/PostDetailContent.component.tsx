import { motion } from 'framer-motion'
import { memo } from 'react'
import { PostContentContainer } from '../PostContent'
import { PostDetailMeta } from './PostDetailMeta.component'
import { PostDetailActions } from './PostDetailActions.component'
import type { PostData } from '../../utils/api'
import type { PostInteractions } from '../../hooks/usePostInteractions.hook'

interface PostDetailContentProps {
  post: PostData
  postId: number
  interactions: PostInteractions
  onToggleLike: () => void
  onToggleBookmark: () => void
  formatDate: (date: string) => string
}

export const PostDetailContent = memo(({ 
  post, 
  postId, 
  interactions, 
  onToggleLike, 
  onToggleBookmark, 
  formatDate 
}: PostDetailContentProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-java-dark mb-6 leading-tight">
        {post.title}
      </h1>

      <PostDetailMeta
        authorName={post.user.username}
        createdAt={post.createdAt}
        readTime={post.readTime}
        formatDate={formatDate}
      />

      <PostDetailActions
        interactions={interactions}
        onToggleLike={onToggleLike}
        onToggleBookmark={onToggleBookmark}
      />

      <div className="markdown-content">
        <PostContentContainer postId={postId} />
      </div>
    </motion.article>
  )
})

PostDetailContent.displayName = 'PostDetailContent' 