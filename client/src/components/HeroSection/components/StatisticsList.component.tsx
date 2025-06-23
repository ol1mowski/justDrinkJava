import { memo } from 'react';
import { StatisticItem, type Statistic } from './StatisticItem.component';

interface StatisticsListProps {
  statistics: Statistic[];
}

export const StatisticsList = memo<StatisticsListProps>(({ statistics }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {statistics.map(statistic => (
        <StatisticItem key={statistic.id} statistic={statistic} />
      ))}
    </div>
  );
});

StatisticsList.displayName = 'StatisticsList';
