import { memo } from 'react';
import { FolderIcon } from '@heroicons/react/24/outline';
import { ErrorState } from '../../ui';

interface CategoriesErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export const CategoriesErrorState = memo<CategoriesErrorStateProps>(
  ({ error, onRetry }) => {
    return (
      <div
        className="bg-java-white dark:bg-java-dark-surface rounded-2xl p-6 sm:p-8 
                   border border-java-gray/10 dark:border-java-dark-text/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-java-red/10 rounded-lg">
              <FolderIcon className="w-5 h-5 text-java-red" />
            </div>
            <h3 className="text-xl font-bold text-java-gray dark:text-java-dark-text">
              Popularne kategorie
            </h3>
          </div>
        </div>

        <ErrorState
          title="Błąd podczas ładowania kategorii"
          message={error}
          onRetry={onRetry}
          retryText="Spróbuj ponownie"
          size="md"
        />
      </div>
    );
  }
);

CategoriesErrorState.displayName = 'CategoriesErrorState';
