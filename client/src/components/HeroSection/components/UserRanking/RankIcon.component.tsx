import { memo } from 'react';
import { TrophyIcon, StarIcon, FireIcon } from '@heroicons/react/24/solid';

interface RankIconProps {
  rank: number;
}

export const RankIcon = memo<RankIconProps>(({ rank }) => {
  switch (rank) {
    case 1:
      return <TrophyIcon className="w-5 h-5 text-yellow-500" />;
    case 2:
      return <StarIcon className="w-5 h-5 text-gray-400" />;
    case 3:
      return <FireIcon className="w-5 h-5 text-orange-500" />;
    default:
      return (
        <div className="w-5 h-5 rounded-full bg-java-orange text-white text-xs font-bold flex items-center justify-center">
          {rank}
        </div>
      );
  }
});

RankIcon.displayName = 'RankIcon';
