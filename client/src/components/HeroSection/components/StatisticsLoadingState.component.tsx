import { memo } from 'react';
import { LoadingState } from '../../ui';

export const StatisticsLoadingState = memo(() => {
  return (
    <div
      className="bg-java-white dark:bg-java-dark-surface rounded-2xl p-6 sm:p-8 
                   border border-java-gray/10 dark:border-java-dark-text/10"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-java-gray dark:text-java-dark-text mb-2">
          Nasza społeczność
        </h3>
        <p className="text-sm text-java-blue/90 dark:text-java-dark-text-secondary">
          Dołącz do developerów Java
        </p>
      </div>

      <LoadingState message="Ładowanie statystyk...">
        <div className="grid grid-cols-2 gap-4">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-java-gray/10 dark:border-java-dark-text/10"
            >
              <div className="w-10 h-10 rounded-lg mb-3 bg-java-gray/20 animate-pulse"></div>
              <div className="h-8 bg-java-gray/20 rounded mb-1 animate-pulse"></div>
              <div className="h-4 bg-java-gray/20 rounded w-20 animate-pulse"></div>
            </div>
          ))}
        </div>
      </LoadingState>
    </div>
  );
});

StatisticsLoadingState.displayName = 'StatisticsLoadingState';
