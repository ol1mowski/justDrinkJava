import { memo } from 'react'
import { TrophyIcon, ClockIcon, CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

interface QuizResultsProps {
  quiz: {
    id: number
    title: string
    description: string
    totalQuestions: number
  }
  userAnswers: Record<number, string[]>
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  onRestart: () => void
}

export const QuizResults = memo<QuizResultsProps>(({
  quiz,
  score,
  totalQuestions,
  correctAnswers,
  timeSpent,
  onRestart
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Doskonały wynik! 🏆'
    if (score >= 80) return 'Bardzo dobry wynik! 🎉'
    if (score >= 70) return 'Dobry wynik! 👍'
    if (score >= 60) return 'Wynik zadowalający 📚'
    return 'Warto jeszcze poćwiczyć 💪'
  }

  const getStars = (score: number) => {
    if (score >= 90) return 5
    if (score >= 80) return 4
    if (score >= 70) return 3
    if (score >= 60) return 2
    return 1
  }

  const stars = getStars(score)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-java-orange rounded-full mb-6">
          <TrophyIcon className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-java-gray dark:text-java-dark-text mb-4">
          Quiz Ukończony!
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-java-dark-text-secondary">
          {quiz.title}
        </p>
      </div>

      {/* Score Card */}
      <div className="bg-white dark:bg-java-dark-surface rounded-2xl shadow-xl border border-gray-200 dark:border-java-dark-border p-8 mb-8">
        <div className="text-center mb-8">
          <div className={`text-6xl font-bold mb-4 ${getScoreColor(score)}`}>
            {score}%
          </div>
          
          <div className="flex justify-center space-x-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`w-8 h-8 ${
                  star <= stars ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          
          <p className="text-xl font-semibold text-java-gray dark:text-java-dark-text mb-2">
            {getScoreMessage(score)}
          </p>
          
          <p className="text-gray-600 dark:text-java-dark-text-secondary">
            Odpowiedziałeś poprawnie na {correctAnswers} z {totalQuestions} pytań
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full mb-4">
              <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
              {correctAnswers}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              Poprawne odpowiedzi
            </div>
          </div>

          <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-full mb-4">
              <XCircleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
              {totalQuestions - correctAnswers}
            </div>
            <div className="text-sm text-red-700 dark:text-red-300">
              Błędne odpowiedzi
            </div>
          </div>

          <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full mb-4">
              <ClockIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {formatTime(timeSpent)}
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              Czas rozwiązywania
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onRestart}
          className="inline-flex items-center justify-center space-x-2 px-8 py-3 bg-java-orange hover:bg-java-red 
                   text-white font-medium rounded-lg transition-colors cursor-pointer
                   focus:outline-none focus:ring-2 focus:ring-java-orange focus:ring-offset-2"
        >
          <ArrowPathIcon className="w-5 h-5" />
          <span>Spróbuj ponownie</span>
        </button>
        
        <button
          onClick={() => window.location.href = '/quizzes'}
          className="inline-flex items-center justify-center space-x-2 px-8 py-3 bg-gray-100 dark:bg-java-dark-bg 
                   hover:bg-gray-200 dark:hover:bg-java-dark-border text-gray-700 dark:text-java-dark-text 
                   font-medium rounded-lg transition-colors cursor-pointer
                   focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <span>Powrót do quizów</span>
        </button>
      </div>
    </div>
  )
})

QuizResults.displayName = 'QuizResults' 