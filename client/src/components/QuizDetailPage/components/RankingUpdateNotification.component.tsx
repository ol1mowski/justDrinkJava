import { memo } from 'react';
import { TrophyIcon } from '@heroicons/react/24/outline';
import type { UserRankingDto } from '../../../api/ranking.api';

interface RankingUpdateNotificationProps {
  userRanking: UserRankingDto;
  show: boolean;
}

export const RankingUpdateNotification = memo<RankingUpdateNotificationProps>(
  ({ userRanking, show }) => {
    if (!show) return null;

    return (
      <div className="mb-8 mx-auto max-w-2xl">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-green-500 rounded-full p-3">
              <TrophyIcon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-800 mb-1">
                🎉 Ranking zaktualizowany!
              </h3>
              <p className="text-green-700">
                Twoja pozycja: <span className="font-bold">#{userRanking.ranking}</span>
                {' • '}
                Łącznie punktów: <span className="font-bold">{userRanking.totalScore}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

RankingUpdateNotification.displayName = 'RankingUpdateNotification'; 