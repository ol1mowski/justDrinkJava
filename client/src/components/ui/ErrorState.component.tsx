import { memo } from 'react'
import type { ReactNode } from 'react'
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
  retryText?: string
  className?: string
  children?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const ErrorState = memo<ErrorStateProps>(({ 
  title = 'Wystąpił błąd',
  message,
  onRetry,
  retryText = 'Spróbuj ponownie',
  className = '',
  children,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'py-4',
    md: 'py-8', 
    lg: 'py-12'
  }

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  if (children) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`text-center ${sizeClasses[size]} ${className}`}>
      <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
        <div className="p-3 bg-java-red/10 rounded-full">
          <ExclamationTriangleIcon className={`${iconSizes[size]} text-java-red`} />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-java-gray dark:text-java-dark-text">
            {title}
          </h3>
          <p className="text-java-red text-sm font-medium">
            {message}
          </p>
        </div>

        {onRetry && (
          <button 
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium 
                     text-java-orange hover:text-java-red transition-colors duration-200 
                     hover:bg-java-orange/5 rounded-lg border border-java-orange/20
                     hover:border-java-red/20 focus:outline-none focus:ring-2 
                     focus:ring-java-orange/50"
          >
            <ArrowPathIcon className="w-4 h-4" />
            {retryText}
          </button>
        )}
      </div>
    </div>
  )
})

ErrorState.displayName = 'ErrorState' 