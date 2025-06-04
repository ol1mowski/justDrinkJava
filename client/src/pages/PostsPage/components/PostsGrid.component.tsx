import { memo, Suspense } from 'react'
import { PostCard } from './PostCard.component' 
import type { PostDTO } from '../hooks/usePosts.hook'
import { LoadingSpinner } from '../../../components/ui'


interface PostsGridProps {
  posts: PostDTO[]
  isLoading: boolean
  onPostClick?: (post: PostDTO) => void
}

export const PostsGrid = memo<PostsGridProps>(({ posts, isLoading, onPostClick }) => {
  if (isLoading) {
    return <LoadingSpinner />
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-java-orange/10 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-12 h-12 text-java-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-java-gray dark:text-java-dark-text mb-2">
            Brak postów
          </h3>
          <p className="text-java-blue/90 dark:text-java-dark-text-secondary">
            Nie znaleźliśmy postów spełniających Twoje kryteria wyszukiwania. Spróbuj zmienić filtry lub wyszukiwane frazy.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="animate-fadeInUp"
          style={{ 
            animationDelay: `${index * 0.1}s`,
            animationFillMode: 'both'
          }}
        >
          <Suspense fallback={<PostCardSkeleton />}>
            <PostCard post={post} onClick={onPostClick} />
          </Suspense>
        </div>
      ))}
    </div>
  )
})

const PostCardSkeleton = memo(() => (
  <div className="bg-java-white dark:bg-java-dark-surface rounded-2xl overflow-hidden shadow-sm border border-java-light-gray/20 dark:border-java-dark-surface/50 animate-pulse">
    <div className="h-48 bg-java-light-gray/30 dark:bg-java-dark-surface/50" />
    
    <div className="p-6">
      <div className="h-6 bg-java-light-gray/30 dark:bg-java-dark-surface/50 rounded mb-3" />
      <div className="h-4 bg-java-light-gray/30 dark:bg-java-dark-surface/50 rounded mb-3 w-3/4" />
      
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-java-light-gray/20 dark:bg-java-dark-surface/30 rounded" />
        <div className="h-4 bg-java-light-gray/20 dark:bg-java-dark-surface/30 rounded" />
        <div className="h-4 bg-java-light-gray/20 dark:bg-java-dark-surface/30 rounded w-2/3" />
      </div>
      
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-java-light-gray/20 dark:bg-java-dark-surface/30 rounded" />
        <div className="h-6 w-20 bg-java-light-gray/20 dark:bg-java-dark-surface/30 rounded" />
        <div className="h-6 w-14 bg-java-light-gray/20 dark:bg-java-dark-surface/30 rounded" />
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-java-light-gray/20 dark:border-java-dark-surface/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-java-light-gray/30 dark:bg-java-dark-surface/50 rounded-full" />
          <div className="h-4 w-20 bg-java-light-gray/30 dark:bg-java-dark-surface/50 rounded" />
        </div>
        <div className="h-3 w-16 bg-java-light-gray/20 dark:bg-java-dark-surface/30 rounded" />
      </div>
    </div>
  </div>
))

PostCardSkeleton.displayName = 'PostCardSkeleton'
PostsGrid.displayName = 'PostsGrid' 