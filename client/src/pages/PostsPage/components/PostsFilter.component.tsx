import { memo, useState } from 'react'
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon, HashtagIcon, FolderIcon } from '@heroicons/react/24/outline'
import type { FilterOptions, SortOption, HashtagDto } from '../hooks/usePosts.hook'

interface PostsFilterProps {
  filters: FilterOptions
  sortBy: SortOption
  hashtags: HashtagDto[]
  categories: Array<{ id: number; name: string }>
  onFiltersChange: (filters: Partial<FilterOptions>) => void
  onSortChange: (sort: SortOption) => void
  resultsCount: number
}

export const PostsFilter = memo<PostsFilterProps>(({
  filters,
  sortBy,
  hashtags,
  categories,
  onFiltersChange,
  onSortChange,
  resultsCount
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onFiltersChange({ searchQuery: value })
  }

  const handleHashtagToggle = (hashtagName: string) => {
    const newHashtags = filters.hashtags.includes(hashtagName)
      ? filters.hashtags.filter(h => h !== hashtagName)
      : [...filters.hashtags, hashtagName]
    
    onFiltersChange({ hashtags: newHashtags })
  }

  const handleCategoryChange = (categoryName: string) => {
    const newCategory = filters.category === categoryName ? undefined : categoryName
    onFiltersChange({ category: newCategory })
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    onFiltersChange({
      searchQuery: '',
      hashtags: [],
      category: undefined
    })
  }

  const activeFiltersCount = filters.hashtags.length + (filters.category ? 1 : 0)

  const sortOptions: Array<{ value: SortOption; label: string }> = [
    { value: 'newest', label: 'Najnowsze' },
    { value: 'oldest', label: 'Najstarsze' },
    { value: 'readTime', label: 'Czas czytania' },
    { value: 'title', label: 'Alfabetycznie' }
  ]

  return (
    <div className="sticky top-0 z-20 bg-java-white/80 dark:bg-java-dark-bg/80 backdrop-blur-lg border-b border-java-light-gray/20 dark:border-java-dark-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="flex-1 relative">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-java-orange" />
              <input
                type="text"
                placeholder="Szukaj postów, kategorii, tagów..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-java-light-gray/30 dark:border-java-dark-surface/50 bg-java-white dark:bg-java-dark-surface text-java-gray dark:text-java-dark-text placeholder-java-gray/50 dark:placeholder-java-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-java-orange/50 focus:border-java-orange transition-all duration-200 hover:border-java-orange/50 cursor-text"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 bg-java-orange text-white shadow-lg hover:bg-java-orange/90 hover:shadow-xl cursor-pointer transform hover:-translate-y-0.5"
            >
              <FunnelIcon className="w-5 h-5 text-white" />
              <span>Filtry</span>
              {activeFiltersCount > 0 && (
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full text-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="px-4 py-3 rounded-xl border border-java-light-gray/30 dark:border-java-dark-surface/50 bg-java-white dark:bg-java-dark-surface text-java-gray dark:text-java-dark-text focus:outline-none focus:ring-2 focus:ring-java-orange/50 focus:border-java-orange transition-all duration-200 hover:border-java-orange/50 hover:shadow-md cursor-pointer"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-java-gray/70 dark:text-java-dark-text-secondary">
            Znaleziono <span className="font-semibold text-java-orange">{resultsCount}</span> postów
          </p>
          
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-java-blue hover:text-java-orange transition-colors duration-200 flex items-center gap-1 cursor-pointer hover:underline"
            >
              <XMarkIcon className="w-4 h-4" />
              Wyczyść filtry
            </button>
          )}
        </div>

        {isFilterOpen && (
          <div className="mt-4 p-4 bg-java-light-gray/30 dark:bg-java-dark-surface/30 rounded-xl border border-java-light-gray/20 dark:border-java-dark-surface/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-white mb-3">
                  <FolderIcon className="w-5 h-5 text-java-orange" />
                  Kategorie
                </h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label
                      key={category.id}
                      className="flex items-center gap-3 cursor-pointer group hover:bg-java-orange/5 p-2 rounded-lg transition-all duration-200"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === category.name}
                        onChange={() => handleCategoryChange(category.name)}
                        className="w-4 h-4 text-java-orange focus:ring-java-orange/50 border-java-gray/30 dark:border-java-dark-text-secondary cursor-pointer"
                      />
                      <span className="text-sm text-white group-hover:text-java-orange transition-colors duration-200">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-semibold text-white mb-3">
                  <HashtagIcon className="w-5 h-5 text-java-orange" />
                  Hashtagi
                </h4>
                <div className="flex flex-wrap gap-2">
                  {hashtags.slice(0, 12).map(hashtag => (
                    <button
                      key={hashtag.id}
                      onClick={() => handleHashtagToggle(hashtag.name)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 hover:shadow-md ${
                        filters.hashtags.includes(hashtag.name)
                          ? 'bg-java-orange text-white shadow-md hover:bg-java-orange/90'
                          : 'bg-java-white dark:bg-java-dark-surface text-java-gray dark:text-java-dark-text border border-java-light-gray/30 dark:border-java-dark-surface/50 hover:border-java-orange hover:text-java-orange hover:bg-java-orange/5'
                      }`}
                    >
                      <span>#{hashtag.name}</span>
                      <span className="text-xs opacity-70">
                        ({hashtag.postCount})
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

PostsFilter.displayName = 'PostsFilter' 