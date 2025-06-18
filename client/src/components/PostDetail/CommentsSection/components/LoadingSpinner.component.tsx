import { memo } from 'react'
import type { LoadingSpinnerProps } from '../types'

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-8 h-8 border-2'
} as const

export const LoadingSpinner = memo<LoadingSpinnerProps>(({ 
  size = 'md', 
  className = '' 
}) => {
  return (
    <div 
      className={`${sizeClasses[size]} border-java-orange border-t-transparent 
                  rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Ładowanie..."
    />
  )
})

LoadingSpinner.displayName = 'LoadingSpinner' 