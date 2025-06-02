import { memo } from 'react'
import { HashtagIcon } from '@heroicons/react/24/outline'
import { ErrorState } from '../../ui'

interface HashtagsErrorStateProps {
  error: string
  onRetry?: () => void
}

export const HashtagsErrorState = memo<HashtagsErrorStateProps>(({ error, onRetry }) => {
  return (
    <div className="bg-java-white dark:bg-java-dark-surface rounded-2xl p-6 sm:p-8 
                   border border-java-gray/10 dark:border-java-dark-text/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-java-red/10 rounded-lg">
            <HashtagIcon className="w-5 h-5 text-java-red" />
          </div>
          <h3 className="text-xl font-bold text-java-gray dark:text-java-dark-text">
            Popularne tematy
          </h3>
        </div>
      </div>
      
      <ErrorState
        title="Błąd podczas ładowania hashtagów"
        message={error}
        onRetry={onRetry}
        retryText="Spróbuj ponownie"
        size="md"
      />
    </div>
  )
})

HashtagsErrorState.displayName = 'HashtagsErrorState' 