import { memo } from 'react'
import { useStatistics } from '../hooks/useStatistics.hook'
import { ErrorBoundaryWrapper } from '../../ui'
import { StatisticsLoadingState } from './StatisticsLoadingState.component'
import { StatisticsErrorState } from './StatisticsErrorState.component'
import { StatisticsHeader } from './StatisticsHeader.component'
import { UserRanking } from './UserRanking.component'
import { StatisticsFooter } from './StatisticsFooter.component'

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

  return (
    <div className="bg-java-white dark:bg-java-dark-surface rounded-2xl p-6 sm:p-8 
                   border border-java-gray/10 dark:border-java-dark-text/10">
      <StatisticsHeader />
      <UserRanking />
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