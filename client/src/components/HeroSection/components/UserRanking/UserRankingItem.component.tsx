import { memo } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { RankIcon } from './RankIcon.component';
import type { UserRankingDto } from '../../../../api/ranking.api';

interface UserRankingItemProps {
  user: UserRankingDto;
}

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
    case 2:
      return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
    case 3:
      return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200';
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

export const UserRankingItem = memo<UserRankingItemProps>(({ user }) => {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${getRankColor(user.ranking)}`}
    >
      <div className="flex items-center space-x-3 min-w-0 flex-1">
        <div className="flex items-center space-x-2 flex-shrink-0">
          <RankIcon rank={user.ranking} />
          <span className="font-semibold text-gray-700 text-sm">
            #{user.ranking}
          </span>
        </div>

        <div className="w-8 h-8 bg-java-orange rounded-full flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-4 h-4 text-white" />
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="font-medium text-gray-800 text-sm truncate"
            title={user.username || 'Użytkownik'}
          >
            {user.username || 'Użytkownik'}
          </div>
          <div className="text-xs text-gray-500">{user.totalScore} pkt</div>
        </div>
      </div>

      <div className="text-right flex-shrink-0 ml-3">
        <div className="font-bold text-java-orange text-sm">
          {user.totalScore.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">punktów</div>
      </div>
    </div>
  );
});

UserRankingItem.displayName = 'UserRankingItem';
