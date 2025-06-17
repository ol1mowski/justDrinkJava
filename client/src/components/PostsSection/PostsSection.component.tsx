import { memo } from 'react'
import { useLatestPosts } from './hooks/useLatestPosts.hook'
import { ErrorBoundaryWrapper } from '../ui'
import { PostsSectionHeader } from './components/PostsSectionHeader.component'
import { PostsGrid } from './components/PostsGrid.component'
import { PostsLoadingState } from './components/PostsLoadingState.component'
import { PostsErrorState } from './components/PostsErrorState.component'
import { PostsSectionFooter } from './components/PostsSectionFooter.component'

const PostsSectionContent = memo(() => {
  const { posts, loading, error, refetch } = useLatestPosts(9)

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-java-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PostsSectionHeader />
          <PostsLoadingState itemsCount={9} />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 lg:py-24 bg-java-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PostsSectionHeader />
          <PostsErrorState error={error} onRetry={refetch} />
        </div>
      </section>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-java-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PostsSectionHeader />
          <div className="text-center py-12">
            <p className="text-lg text-java-blue/90">
              Brak postów do wyświetlenia.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-java-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PostsSectionHeader />
        <PostsGrid posts={posts} />
        <PostsSectionFooter />
      </div>
    </section>
  )
})

PostsSectionContent.displayName = 'PostsSectionContent'

export const PostsSection = memo(() => {
  return (
    <ErrorBoundaryWrapper
      title="Błąd sekcji postów"
      message="Wystąpił problem podczas ładowania sekcji z najnowszymi postami"
    >
      <PostsSectionContent />
    </ErrorBoundaryWrapper>
  )
})

PostsSection.displayName = 'PostsSection' 