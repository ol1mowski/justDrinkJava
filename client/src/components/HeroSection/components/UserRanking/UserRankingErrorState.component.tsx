import { memo } from 'react';

interface UserRankingErrorStateProps {
  onRetry: () => void;
}

export const UserRankingErrorState = memo<UserRankingErrorStateProps>(
  ({ onRetry }) => {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 text-sm mb-2">
          Nie udało się załadować rankingu
        </p>
        <button
          onClick={onRetry}
          className="text-xs text-java-orange hover:text-java-red font-medium transition-colors"
        >
          Spróbuj ponownie
        </button>
      </div>
    );
  }
);

UserRankingErrorState.displayName = 'UserRankingErrorState';
