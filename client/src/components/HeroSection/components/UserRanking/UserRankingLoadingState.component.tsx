import { memo } from 'react';

interface UserRankingLoadingStateProps {
  limit: number;
}

export const UserRankingLoadingState = memo<UserRankingLoadingStateProps>(
  ({ limit }) => {
    return (
      <div className="space-y-3">
        {Array.from({ length: limit }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 animate-pulse"
          >
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="space-y-1">
                <div className="w-20 h-3 bg-gray-300 rounded"></div>
                <div className="w-16 h-2 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="w-12 h-3 bg-gray-300 rounded"></div>
              <div className="w-10 h-2 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

UserRankingLoadingState.displayName = 'UserRankingLoadingState';
