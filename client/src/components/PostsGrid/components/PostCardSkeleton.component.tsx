import { memo } from 'react';

export const PostCardSkeleton = memo(() => (
  <div className="bg-java-white dark:bg-java-dark-surface rounded-2xl overflow-hidden shadow-sm border border-java-light-gray/20 dark:border-java-dark-surface/50 animate-pulse">
    <div className="h-48 bg-java-light-gray/30 dark:bg-java-dark-surface/50" />

    <div className="p-6">
      <div className="h-6 bg-java-light-gray/30 dark:bg-java-dark-surface/50 rounded mb-3" />
      <div className="h-4 bg-java-light-gray/30 dark:bg-java-dark-surface/50 rounded mb-3 w-3/4" />

      <div className="space-y-2 mb-4">
        <div className="h-4 bg-java-light-gray/20 dark:bg-java-dark-surface/30 rounded" />
        <div className="h-4 bg-java-light-gray/20 dark:bg-java-dark-surface/30 rounded" />
        <div className="h-4 bg-java-light-gray/20 dark:bg-java-dark-surface/30 rounded w-2/3" />
      </div>

      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-java-light-gray/20 dark:bg-java-dark-surface/30 rounded" />
        <div className="h-6 w-20 bg-java-light-gray/20 dark:bg-java-dark-surface/30 rounded" />
        <div className="h-6 w-14 bg-java-light-gray/20 dark:bg-java-dark-surface/30 rounded" />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-java-light-gray/20 dark:border-java-dark-surface/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-java-light-gray/30 dark:bg-java-dark-surface/50 rounded-full" />
          <div className="h-4 w-20 bg-java-light-gray/30 dark:bg-java-dark-surface/50 rounded" />
        </div>
        <div className="h-3 w-16 bg-java-light-gray/20 dark:bg-java-dark-surface/30 rounded" />
      </div>
    </div>
  </div>
));

PostCardSkeleton.displayName = 'PostCardSkeleton';
