import { memo } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, FlagIcon } from '@heroicons/react/24/outline'

interface QuizNavigationProps {
  currentIndex: number
  totalQuestions: number
  onNext: () => void
  onPrevious: () => void
  onSubmit: () => void
  hasAnswered: boolean
}

export const QuizNavigation = memo<QuizNavigationProps>(({
  currentIndex,
  totalQuestions,
  onNext,
  onPrevious,
  onSubmit,
  hasAnswered
}) => {
  const isFirst = currentIndex === 0
  const isLast = currentIndex === totalQuestions - 1

  return (
    <div className="bg-white dark:bg-java-dark-surface rounded-xl shadow-lg border border-gray-200 dark:border-java-dark-border p-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
                     focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isFirst
              ? 'bg-gray-100 dark:bg-java-dark-bg text-gray-400 dark:text-java-dark-text-secondary cursor-not-allowed'
              : 'bg-gray-100 dark:bg-java-dark-bg text-gray-700 dark:text-java-dark-text hover:bg-gray-200 dark:hover:bg-java-dark-border focus:ring-gray-500 cursor-pointer'
          }`}
        >
          <ChevronLeftIcon className="w-4 h-4" />
          <span>Poprzednie</span>
        </button>

        <div className="flex items-center space-x-2">
          {Array.from({ length: totalQuestions }, (_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-java-orange scale-125'
                  : index < currentIndex
                  ? 'bg-green-500'
                  : 'bg-gray-300 dark:bg-java-dark-border'
              }`}
            />
          ))}
        </div>

        {isLast ? (
          <button
            onClick={onSubmit}
            className="inline-flex items-center space-x-2 px-6 py-2 bg-java-orange hover:bg-java-red 
                     text-white font-medium text-sm rounded-lg transition-colors cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-java-orange focus:ring-offset-2"
          >
            <FlagIcon className="w-4 h-4" />
            <span>Zakończ Quiz</span>
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!hasAnswered}
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
                       focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              hasAnswered
                ? 'bg-java-orange hover:bg-java-red text-white focus:ring-java-orange cursor-pointer'
                : 'bg-gray-100 dark:bg-java-dark-bg text-gray-400 dark:text-java-dark-text-secondary cursor-not-allowed'
            }`}
          >
            <span>Następne</span>
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      {!hasAnswered && !isLast && (
        <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200 shadow-sm">
          <p className="text-sm text-amber-700 text-center font-medium">
            Wybierz odpowiedź, aby przejść do następnego pytania
          </p>
        </div>
      )}
    </div>
  )
})

QuizNavigation.displayName = 'QuizNavigation' 