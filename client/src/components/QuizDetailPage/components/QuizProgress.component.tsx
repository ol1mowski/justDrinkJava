import { memo } from 'react'

interface QuizProgressProps {
  current: number
  total: number
  progress: number
}

export const QuizProgress = memo<QuizProgressProps>(({ current, total, progress }) => {
  return (
    <div className="bg-white dark:bg-java-dark-surface rounded-xl shadow-lg border border-gray-200 dark:border-java-dark-border p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-java-gray dark:text-java-dark-text">
          Pytanie {current} z {total}
        </h2>
        <span className="text-sm text-gray-500 dark:text-java-dark-text-secondary">
          {Math.round(progress)}% ukończone
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-java-dark-border rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-java-orange to-java-red transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-3">
        <span className="text-xs text-gray-500 dark:text-java-dark-text-secondary">
          Rozpoczęte
        </span>
        <span className="text-xs text-gray-500 dark:text-java-dark-text-secondary">
          Ukończone
        </span>
      </div>
    </div>
  )
})

QuizProgress.displayName = 'QuizProgress' 