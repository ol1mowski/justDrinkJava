import { memo } from 'react'
import { ErrorState } from '../../ui'

interface StatisticsErrorStateProps {
  error: string
  onRetry?: () => void
}

export const StatisticsErrorState = memo<StatisticsErrorStateProps>(({ error, onRetry }) => {
  return (
    <div className="bg-java-white dark:bg-java-dark-surface rounded-2xl p-6 sm:p-8 
                   border border-java-gray/10 dark:border-java-dark-text/10">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-java-gray dark:text-java-dark-text mb-2">
          Nasza społeczność
        </h3>
        <p className="text-sm text-java-blue/90 dark:text-java-dark-text-secondary">
          Dołącz do developerów Java
        </p>
      </div>
      
      <ErrorState
        title="Błąd podczas ładowania statystyk"
        message={error}
        onRetry={onRetry}
        retryText="Spróbuj ponownie"
        size="md"
      />
    </div>
  )
})

StatisticsErrorState.displayName = 'StatisticsErrorState' 