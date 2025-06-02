import { memo } from 'react'
import { ErrorState } from '../../ui'

interface PostsErrorStateProps {
  error: string
  onRetry?: () => void
}

export const PostsErrorState = memo<PostsErrorStateProps>(({ error, onRetry }) => {
  return (
    <div className="flex justify-center">
      <div className="max-w-md">
        <ErrorState
          title="Błąd podczas ładowania postów"
          message={error}
          onRetry={onRetry}
          retryText="Spróbuj ponownie"
          size="lg"
        />
      </div>
    </div>
  )
})

PostsErrorState.displayName = 'PostsErrorState' 