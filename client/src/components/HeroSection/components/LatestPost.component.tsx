import { memo } from 'react'
import { useLatestPost } from '../hooks/useLatestPost'
import { PostLoadingSkeleton } from './PostLoadingSkeleton.component'
import { PostErrorState } from './PostErrorState.component'
import { PostBadge } from './PostBadge.component'
import { PostImage } from './PostImage.component'
import { PostMetadata } from './PostMetadata.component'
import { PostContent } from './PostContent.component'
import { PostAuthor } from './PostAuthor.component'
import { PostActions } from './PostActions.component'

export const LatestPost = memo(() => {
  const { data: postData, loading, error, refetch } = useLatestPost()

  if (loading) {
    return <PostLoadingSkeleton />
  }

  if (error) {
    return <PostErrorState error={error} onRetry={refetch} />
  }

  if (!postData) {
    return <PostErrorState error="Brak danych do wyświetlenia" onRetry={refetch} />
  }

  const hasImage = postData.imageUrl && postData.imageUrl.trim() !== ''
  const imageUrl = hasImage ? postData.imageUrl : null

  const handleReadMore = () => {
    console.log('Navigate to post:', postData.id)
  }

  return (
    <article className="group relative bg-java-white dark:bg-java-dark-surface rounded-2xl overflow-hidden 
                       border border-java-gray/10 dark:border-java-dark-text/10 
                       hover:border-java-orange/30 dark:hover:border-java-orange/30 
                       transition-all duration-300 hover:shadow-xl hover:shadow-java-orange/10
                       cursor-pointer">
      
      <PostBadge />
      
      <PostImage imageUrl={imageUrl} title={postData.title} />

      <div className="p-6 sm:p-8">
        <PostMetadata
          category={postData.category}
          createdAt={postData.createdAt}
          readTimeFormatted={postData.readTimeFormatted}
        />

        <PostContent
          title={postData.title}
          description={postData.description}
        />

        <div className="flex items-center justify-between">
          <PostAuthor user={postData.user} />
          <PostActions onReadMore={handleReadMore} />
        </div>
      </div>
    </article>
  )
})

LatestPost.displayName = 'LatestPost' 