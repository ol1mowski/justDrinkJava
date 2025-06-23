import { memo } from 'react';
import { PostsGrid } from '../../PostsGrid/PostsGrid.component';
import { LoadingSpinner } from '../../ui';
import type { PostDTO } from '../../PostCard/types';

interface SearchResultsProps {
  posts: PostDTO[];
  isLoading: boolean;
  error: string | null;
  total: number;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore: () => void;
  query: string;
}

export const SearchResults = memo<SearchResultsProps>(
  ({
    posts,
    isLoading,
    error,
    total,
    hasMore,
    isLoadingMore,
    onLoadMore,
    query,
  }) => {
    if (isLoading && posts.length === 0) {
      return (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-java-red/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-java-red"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-java-gray dark:text-java-dark-text mb-2">
              Wystąpił błąd
            </h3>
            <p className="text-java-blue/90 dark:text-java-dark-text-secondary">
              {error}
            </p>
          </div>
        </div>
      );
    }

    if (!query.trim()) {
      return (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-java-dark-text-secondary">
            Wprowadź frazę do wyszukania
          </p>
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-java-orange/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-java-orange"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-java-gray dark:text-java-dark-text mb-2">
              Brak wyników
            </h3>
            <p className="text-java-blue/90 dark:text-java-dark-text-secondary">
              Nie znaleźliśmy postów dla frazy "{query}"
            </p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="mb-6">
          <p className="text-sm text-java-gray/70 dark:text-java-dark-text-secondary">
            Znaleziono{' '}
            <span className="font-semibold text-java-orange">{total}</span>{' '}
            wyników dla "{query}"
          </p>
        </div>

        <PostsGrid posts={posts} isLoading={false} />

        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={onLoadMore}
              disabled={isLoadingMore}
              className="inline-flex items-center px-6 py-3 bg-java-orange text-white font-medium rounded-lg hover:bg-java-orange/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">Ładowanie...</span>
                </>
              ) : (
                'Załaduj więcej'
              )}
            </button>
          </div>
        )}
      </div>
    );
  }
);

SearchResults.displayName = 'SearchResults';
