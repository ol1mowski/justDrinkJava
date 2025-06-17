import { memo, useEffect, useState } from 'react'
import { useSearchPosts } from './hooks/useSearchPosts.hook'
import { SearchHeader } from './components/SearchHeader.component'
import { SearchInput } from './components/SearchInput.component'
import { SearchResults } from './components/SearchResults.component'
import { ErrorBoundaryWrapper } from '../ui'

export const SearchPage = memo(() => {
  const [query, setQuery] = useState('')
  const [searchParams, setSearchParams] = useState({ query: '' })
  
  const { 
    data,
    isLoading, 
    error, 
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useSearchPosts(searchParams)

  const posts = data?.pages.flatMap(page => page.posts) || []
  const total = data?.pages[0]?.totalCount || 0

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlQuery = urlParams.get('q')
    if (urlQuery) {
      setQuery(urlQuery)
      setSearchParams({ query: urlQuery })
    }
  }, [])

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
      setSearchParams({ query: value })
    } else {
      setSearchParams({ query: '' })
    }
  }

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return (
    <ErrorBoundaryWrapper
      title="Błąd wyszukiwania"
      message="Wystąpił problem podczas wyszukiwania postów"
    >
      <div className="min-h-screen bg-gradient-to-br from-java-orange/5 via-white to-java-orange/10 dark:from-java-dark-bg dark:via-java-dark-bg dark:to-java-dark-surface">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <SearchHeader />

          <SearchInput
            value={query}
            onChange={handleSearch}
          />
    
          <SearchResults
            posts={posts}
            isLoading={isLoading}
            error={error?.message || null}
            total={total}
            hasMore={hasNextPage}
            isLoadingMore={isFetchingNextPage}
            onLoadMore={handleLoadMore}
            query={query}
          />
        </div>
      </div>
    </ErrorBoundaryWrapper>
  )
})

SearchPage.displayName = 'SearchPage' 