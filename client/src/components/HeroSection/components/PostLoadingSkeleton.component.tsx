import { memo } from 'react';
import { LoadingSpinner } from '../../ui';

export const PostLoadingSkeleton = memo(() => (
  <article
    className="group relative bg-java-white dark:bg-java-dark-surface rounded-2xl overflow-hidden 
                     border border-java-gray/10 dark:border-java-dark-text/10"
  >
    <div className="relative h-48 sm:h-56 lg:h-64 bg-java-gray/10 dark:bg-java-dark-text/10 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <LoadingSpinner size="lg" className="text-java-orange" />
      </div>
    </div>
    <div className="p-6 sm:p-8">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-6 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-24 animate-pulse" />
        <div className="h-4 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-32 animate-pulse" />
      </div>
      <div className="h-8 bg-java-gray/10 dark:bg-java-dark-text/10 rounded mb-4 animate-pulse" />
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-java-gray/10 dark:bg-java-dark-text/10 rounded animate-pulse" />
        <div className="h-4 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-4/5 animate-pulse" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-java-gray/10 dark:bg-java-dark-text/10 animate-pulse" />
          <div className="h-4 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-24 animate-pulse" />
        </div>
        <div className="h-10 bg-java-gray/10 dark:bg-java-dark-text/10 rounded w-32 animate-pulse" />
      </div>
    </div>
  </article>
));

PostLoadingSkeleton.displayName = 'PostLoadingSkeleton';
