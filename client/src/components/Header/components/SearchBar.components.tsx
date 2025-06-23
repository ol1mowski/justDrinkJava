import { memo, useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../../../hooks/useLanguage.hooks';
import { useTranslations } from '../../../translations';
import { useSearchPosts } from '../../../hooks/useSearchPosts.hook';
import { SearchResults } from '../../SearchResults/SearchResults.component';
import { SearchErrorBoundary } from '../../ErrorBoundary/SearchErrorBoundary.component';

export const SearchBar = memo(() => {
  const { currentLanguage } = useLanguage();
  const t = useTranslations(currentLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { posts, isLoading, error, total, searchPosts, clearSearch } =
    useSearchPosts();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    searchPosts(value);

    if (value.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    clearSearch();
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    if (query.trim()) {
      setIsOpen(true);
    }
  };

  return (
    <div ref={searchRef} className="relative group w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          name="search"
          value={query}
          onChange={e => handleInputChange(e.target.value)}
          onFocus={handleFocus}
          placeholder={t.search.placeholder}
          className="w-full pl-10 pr-10 py-2 border-2 rounded-lg border-java-gray/20
                     bg-java-white dark:bg-java-dark-surface backdrop-blur-sm 
                     transition-all duration-300 focus:ring-2 focus:ring-java-orange/50 
                     text-sm outline-none
                     dark:border-java-dark-text/20
                     hover:border-[#666666] dark:hover:border-java-orange/50 
                     focus:border-java-orange 
                     text-java-gray dark:text-java-dark-text
                     placeholder:text-java-gray/60 dark:placeholder:text-java-dark-text-secondary"
        />

        <MagnifyingGlassIcon
          className="absolute left-3 top-1/2 transform -translate-y-1/2 
                                       w-4 h-4 text-java-gray/70 dark:text-java-dark-text-secondary"
        />

        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 
                       w-4 h-4 text-java-gray/70 dark:text-java-dark-text-secondary
                       hover:text-java-orange transition-colors"
          >
            <XMarkIcon />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-java-dark-surface 
                        rounded-xl shadow-2xl border border-java-orange/20 z-50 max-h-96 overflow-y-auto"
        >
          <div className="p-4">
            <SearchErrorBoundary
              fallback={
                <div className="text-center py-4">
                  <p className="text-red-500 text-sm">Błąd wyszukiwania</p>
                </div>
              }
            >
              <SearchResults
                posts={posts.slice(0, 5)}
                isLoading={isLoading}
                error={error}
                total={total}
                hasMore={false}
                onLoadMore={() => {}}
                query={query}
              />
            </SearchErrorBoundary>

            {posts.length > 5 && (
              <div className="mt-4 pt-4 border-t border-java-orange/20">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = `/search?q=${encodeURIComponent(query)}`;
                  }}
                  className="w-full text-center text-java-orange hover:text-java-orange/80 
                             font-medium py-2 transition-colors"
                >
                  Zobacz wszystkie wyniki ({total})
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
