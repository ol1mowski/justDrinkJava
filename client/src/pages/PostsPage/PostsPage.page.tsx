import { memo, Suspense, useCallback } from 'react'
import { usePosts } from './hooks/usePosts.hook'
import { PostsFilter } from './components/PostsFilter.component'
import { PostsGrid } from './components/PostsGrid.component'
import { LoadingSpinner } from '../../components/ui'
import type { PostDTO } from './hooks/usePosts.hook'

export const PostsPage = memo(() => {
  const {
    hashtags,
    categories,
    isLoading,
    error,
    sortBy,
    filters,
    filteredPosts,
    setSortBy,
    setFilters,
    refreshPosts
  } = usePosts()

  const handlePostClick = useCallback((post: PostDTO) => {
    console.log('Otwieranie posta:', post)
  }, [])

  const handleRefresh = useCallback(async () => {
    await refreshPosts()
  }, [refreshPosts])

  if (error) {
    return (
      <div className="min-h-screen py-16 lg:py-24 bg-java-white dark:bg-java-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-java-red/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-java-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-java-gray dark:text-java-dark-text mb-2">
                Wystąpił błąd
              </h3>
              <p className="text-java-blue/90 dark:text-java-dark-text-secondary mb-6">
                {error}
              </p>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-6 py-3 bg-java-orange text-white font-medium rounded-lg hover:bg-java-orange/90 transition-colors duration-200"
              >
                Spróbuj ponownie
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-java-white dark:bg-java-dark-bg">

      <Suspense fallback={<div className="h-24 bg-java-white/80 dark:bg-java-dark-bg/80" />}>
        <PostsFilter
          filters={filters}
          sortBy={sortBy}
          hashtags={hashtags}
          categories={categories}
          onFiltersChange={setFilters}
          onSortChange={setSortBy}
          resultsCount={filteredPosts.length}
        />
      </Suspense>

      <div className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<LoadingSpinner />}>
            <PostsGrid
              posts={filteredPosts}
              isLoading={isLoading}
              onPostClick={handlePostClick}
            />
          </Suspense>
        </div>
      </div>
    
      {!isLoading && filteredPosts.length > 0 && (
        <div className="py-16 bg-gradient-to-r from-java-orange/5 to-java-blue/5 dark:from-java-orange/10 dark:to-java-blue/10">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-java-gray dark:text-java-dark-text mb-4">
              Nie znalazłeś tego, czego szukasz?
            </h3>
            <p className="text-java-blue/90 dark:text-java-dark-text-secondary mb-8">
              Sprawdź nasze inne sekcje lub skorzystaj z wyszukiwania, aby znaleźć dokładnie to, co Cię interesuje.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRefresh}
                className="inline-flex items-center justify-center px-8 py-3 bg-java-orange text-white font-medium rounded-lg hover:bg-java-orange/90 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Odśwież posty
              </button>
              <button
                onClick={() => setFilters({ searchQuery: '', hashtags: [], category: undefined })}
                className="inline-flex items-center justify-center px-8 py-3 bg-java-white dark:bg-java-dark-surface text-java-gray dark:text-java-dark-text font-medium rounded-lg hover:bg-java-light-gray dark:hover:bg-java-dark-surface/80 transition-all duration-200 shadow-lg hover:shadow-xl border border-java-light-gray/30 dark:border-java-dark-surface/50"
              >
                Wyczyść filtry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

PostsPage.displayName = 'PostsPage' 