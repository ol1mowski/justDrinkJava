import { memo, useEffect, useState } from 'react'
import { useSearchPosts } from '../../hooks/useSearchPosts.hook'
import { SearchResults } from '../../components/SearchResults/SearchResults.component'
import { SearchErrorBoundary } from '../../components/ErrorBoundary/SearchErrorBoundary.component'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export const SearchPage = memo(() => {
  const [query, setQuery] = useState('')
  const { 
    posts, 
    isLoading, 
    error, 
    total, 
    hasMore, 
    searchPosts, 
    loadMore, 
    clearSearch 
  } = useSearchPosts()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlQuery = urlParams.get('q')
    if (urlQuery) {
      setQuery(urlQuery)
      searchPosts(urlQuery)
    }
  }, [searchPosts])

  useEffect(() => {
    const url = new URL(window.location.href)
    if (query.trim()) {
      url.searchParams.set('q', query)
    } else {
      url.searchParams.delete('q')
    }
    window.history.replaceState({}, '', url.toString())
  }, [query])

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.trim()) {
      searchPosts(value)
    } else {
      clearSearch()
    }
  }

  return (
    <SearchErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-java-orange/5 via-white to-java-orange/10 dark:from-java-dark-bg dark:via-java-dark-bg dark:to-java-dark-surface">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-java-dark-text mb-4">
              🔍 Wyszukiwanie postów
            </h1>
            <p className="text-lg text-gray-600 dark:text-java-dark-text-secondary">
              Znajdź interesujące Cię artykuły i porady
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Wpisz frazę do wyszukania..."
                className="w-full pl-12 pr-4 py-4 text-lg border-2 rounded-xl border-java-gray/20
                           bg-white dark:bg-java-dark-surface backdrop-blur-sm 
                           transition-all duration-300 focus:ring-2 focus:ring-java-orange/50 
                           outline-none shadow-lg
                           dark:border-java-dark-text/20
                           hover:border-java-orange/50 dark:hover:border-java-orange/50 
                           focus:border-java-orange 
                           text-gray-800 dark:text-java-dark-text
                           placeholder:text-gray-500 dark:placeholder:text-java-dark-text-secondary"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                             w-6 h-6 text-gray-500 dark:text-java-dark-text-secondary" />
            </div>
          </div>
    
          <SearchResults
            posts={posts}
            isLoading={isLoading}
            error={error}
            total={total}
            hasMore={hasMore}
            onLoadMore={loadMore}
            query={query}
          />
        </div>
      </div>
    </SearchErrorBoundary>
  )
})

SearchPage.displayName = 'SearchPage' 