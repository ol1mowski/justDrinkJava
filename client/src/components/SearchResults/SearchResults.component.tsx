import { memo } from 'react';
import type { PostData } from '../../utils/api';

interface SearchResultsProps {
  posts: PostData[];
  isLoading: boolean;
  error: string | null;
  total: number;
  hasMore: boolean;
  onLoadMore: () => void;
  query: string;
}

const SearchResultItem = memo<{ post: PostData }>(({ post }) => (
  <article className="bg-white dark:bg-java-dark-surface rounded-xl shadow-lg p-6 border border-java-orange/20 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-start space-x-4">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs font-medium text-java-orange bg-java-orange/10 px-2 py-1 rounded-full">
            {post.category?.name || 'Artykuł'}
          </span>
          <span className="text-xs text-gray-500 dark:text-java-dark-text-secondary">
            {post.readTimeFormatted}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-java-dark-text mb-2 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 dark:text-java-dark-text-secondary text-sm line-clamp-3 mb-3">
          {post.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-java-dark-text-secondary">
              {post.user.username}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500 dark:text-java-dark-text-secondary">
              {new Date(post.createdAt).toLocaleDateString('pl-PL')}
            </span>
          </div>

          <button
            onClick={() => (window.location.href = `/posts/${post.id}`)}
            className="text-java-orange hover:text-java-orange/80 text-sm font-medium transition-colors cursor-pointer"
          >
            Czytaj więcej →
          </button>
        </div>
      </div>
    </div>
  </article>
));

SearchResultItem.displayName = 'SearchResultItem';

export const SearchResults = memo<SearchResultsProps>(
  ({ posts, isLoading, error, total, hasMore, onLoadMore, query }) => {
    if (error) {
      return (
        <div className="text-center py-12">
          <div className="text-red-500 text-4xl mb-4">❌</div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-java-dark-text mb-2">
            Wystąpił błąd
          </h3>
          <p className="text-gray-600 dark:text-java-dark-text-secondary">
            {error}
          </p>
        </div>
      );
    }

    if (!query.trim()) {
      return (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-java-dark-text mb-2">
            Wyszukaj posty
          </h3>
          <p className="text-gray-600 dark:text-java-dark-text-secondary">
            Wpisz frazę w pole wyszukiwania, aby znaleźć interesujące Cię posty
          </p>
        </div>
      );
    }

    if (!isLoading && posts.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-java-dark-text mb-2">
            Brak wyników
          </h3>
          <p className="text-gray-600 dark:text-java-dark-text-secondary">
            Nie znaleziono postów dla frazy "{query}"
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {posts.length > 0 && (
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 dark:text-java-dark-text">
              Wyniki wyszukiwania dla "{query}"
              <span className="text-sm font-normal text-gray-500 dark:text-java-dark-text-secondary ml-2">
                ({total}{' '}
                {total === 1 ? 'wynik' : total < 5 ? 'wyniki' : 'wyników'})
              </span>
            </h2>
          </div>
        )}

        <div className="space-y-4">
          {posts.map(post => (
            <SearchResultItem key={post.id} post={post} />
          ))}
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin text-java-orange text-3xl mb-3">
              ⚙️
            </div>
            <p className="text-gray-600 dark:text-java-dark-text-secondary">
              Wyszukiwanie postów...
            </p>
          </div>
        )}

        {hasMore && !isLoading && (
          <div className="text-center pt-6">
            <button
              onClick={onLoadMore}
              className="bg-java-orange hover:bg-java-orange/90 text-white font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer"
            >
              Załaduj więcej wyników
            </button>
          </div>
        )}
      </div>
    );
  }
);

SearchResults.displayName = 'SearchResults';
