import { memo } from 'react'
import { 
  DocumentTextIcon, 
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { useStatistics } from '../../../hooks/useStatistics.hook'
import { ErrorBoundaryWrapper } from '../../ui'
import { StatisticsLoadingState } from './StatisticsLoadingState.component'
import { StatisticsErrorState } from './StatisticsErrorState.component'
import { StatisticsHeader } from './StatisticsHeader.component'
import { StatisticsList } from './StatisticsList.component'
import { StatisticsFooter } from './StatisticsFooter.component'
import type { Statistic } from './StatisticItem.component'

const StatisticsContent = memo(() => {
  const { statistics, loading, error, refetch } = useStatistics()

  if (loading) {
    return <StatisticsLoadingState />
  }

  if (error) {
    return <StatisticsErrorState error={error} onRetry={refetch} />
  }

  if (!statistics) {
    return null
  }

  const statisticsData: Statistic[] = [
    {
      id: '1',
      icon: DocumentTextIcon,
      value: `${statistics.postsCount}`,
      label: 'Artykułów',
      color: 'orange'
    },
    {
      id: '2',
      icon: QuestionMarkCircleIcon,
      value: `${statistics.quizzesCount}`,
      label: 'Quizów',
      color: 'blue'
    },
  ]

  return (
    <div className="bg-java-white dark:bg-java-dark-surface rounded-2xl p-6 sm:p-8 
                   border border-java-gray/10 dark:border-java-dark-text/10">
      <StatisticsHeader />
      <StatisticsList statistics={statisticsData} />
      <StatisticsFooter />
    </div>
  )
})

StatisticsContent.displayName = 'StatisticsContent'

export const StatisticsGrid = memo(() => {
  return (
    <ErrorBoundaryWrapper
      title="Błąd komponentu statystyk"
      message="Wystąpił problem podczas wyświetlania statystyk"
    >
      <StatisticsContent />
    </ErrorBoundaryWrapper>
  )
})

StatisticsGrid.displayName = 'StatisticsGrid' 