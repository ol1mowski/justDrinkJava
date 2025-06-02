import { memo } from 'react'
import type { ReactNode } from 'react'
import { LoadingSpinner } from './LoadingSpinner.component'

interface LoadingStateProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: ReactNode
  showSpinner?: boolean
}

export const LoadingState = memo<LoadingStateProps>(({ 
  message = 'Ładowanie...', 
  size = 'md',
  className = '',
  children,
  showSpinner = true
}) => {
  if (children) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      {showSpinner && (
        <LoadingSpinner 
          size={size} 
          className="text-java-orange mb-4" 
        />
      )}
      <p className="text-java-gray/70 dark:text-java-dark-text-secondary text-sm">
        {message}
      </p>
    </div>
  )
})

LoadingState.displayName = 'LoadingState' 