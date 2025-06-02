import { memo } from 'react'
import { ErrorState } from '../../ui'

interface PostErrorStateProps {
  error: string
  onRetry: () => void
}

export const PostErrorState = memo<PostErrorStateProps>(({ error, onRetry }) => (
  <article className="group relative bg-java-white dark:bg-java-dark-surface rounded-2xl overflow-hidden 
                     border border-java-red/20 dark:border-java-red/20">
    <div className="p-6 sm:p-8">
      <ErrorState
        title="Błąd podczas ładowania posta"
        message={error}
        onRetry={onRetry}
        retryText="Spróbuj ponownie"
        size="md"
      />
    </div>
  </article>
))

PostErrorState.displayName = 'PostErrorState' 