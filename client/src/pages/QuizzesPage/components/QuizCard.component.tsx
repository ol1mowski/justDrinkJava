import { memo } from 'react'
import { PlayIcon, LockClosedIcon, CalendarIcon } from '@heroicons/react/24/outline'
import type { QuizCardProps } from '../types'

export const QuizCard = memo<QuizCardProps>(({ quiz, isBlocked = false, onStartQuiz }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleClick = () => {
    if (!isBlocked && onStartQuiz) {
      onStartQuiz(quiz.id)
    }
  }

  return (
    <div className={`relative bg-white rounded-xl shadow-lg border border-gray-200 p-6 transition-all duration-200 ${
      isBlocked ? 'opacity-60' : 'hover:shadow-xl hover:border-java-orange/30 cursor-pointer'
    }`}>
      {isBlocked && (
        <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center z-10">
          <div className="text-center p-6">
            <LockClosedIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Quiz zablokowany
            </h3>
            <p className="text-gray-600 mb-4">
              Aby uzyskać dostęp do więcej quizów musisz się zalogować
            </p>
            <button className="bg-java-orange hover:bg-java-orange/90 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Zaloguj się
            </button>
          </div>
        </div>
      )}

      <div className={isBlocked ? 'blur-sm' : ''}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {quiz.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {quiz.description}
            </p>
          </div>
          {!isBlocked && (
            <button
              onClick={handleClick}
              className="ml-4 p-3 bg-java-orange hover:bg-java-orange/90 text-white rounded-lg transition-colors"
            >
              <PlayIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>Utworzono: {formatDate(quiz.createdAt)}</span>
        </div>
      </div>
    </div>
  )
})

QuizCard.displayName = 'QuizCard' 