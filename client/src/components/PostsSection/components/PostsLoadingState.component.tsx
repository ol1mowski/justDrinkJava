import { memo } from 'react';
import { LoadingSpinner } from '../../ui';

interface PostsLoadingStateProps {
  itemsCount?: number;
}

export const PostsLoadingState = memo<PostsLoadingStateProps>(
  ({ itemsCount = 9 }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(itemsCount)].map((_, index) => (
          <div
            key={index}
            className="bg-java-white dark:bg-java-dark-surface rounded-xl overflow-hidden 
                                   border border-java-gray/10 dark:border-java-dark-text/10"
          >
            <div className="relative h-48 bg-java-gray/10 dark:bg-java-dark-text/10 animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner size="md" className="text-java-orange" />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="h-4 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-16 animate-pulse" />
                <div className="h-3 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-20 animate-pulse" />
                <div className="h-3 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-24 animate-pulse" />
              </div>
              <div className="h-6 bg-java-gray/10 dark:bg-java-dark-text/10 rounded mb-3 animate-pulse" />
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-java-gray/10 dark:bg-java-dark-text/10 rounded animate-pulse" />
                <div className="h-4 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-4/5 animate-pulse" />
                <div className="h-4 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-3/5 animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-java-gray/10 dark:bg-java-dark-text/10 animate-pulse" />
                <div className="h-3 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-20 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

PostsLoadingState.displayName = 'PostsLoadingState';
