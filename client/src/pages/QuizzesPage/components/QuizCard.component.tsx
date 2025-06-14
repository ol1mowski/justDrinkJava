import { memo } from 'react'
import { PlayIcon, LockClosedIcon, CalendarIcon, UserIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { FireIcon } from '@heroicons/react/24/solid'
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
    <div className={`group relative overflow-hidden rounded-2xl transition-all duration-500 transform ${
      isBlocked 
        ? 'opacity-70 scale-95' 
        : 'hover:scale-105 hover:shadow-2xl hover:-translate-y-2 cursor-pointer'
    }`}>
      {/* Background */}
      <div className="absolute inset-0 bg-blue-50" />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-java-orange rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-java-blue rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-500" />
      </div>

      {/* Main Card Content */}
      <div className="relative bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl">
        {isBlocked && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
            <div className="text-center p-8">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <LockClosedIcon className="w-10 h-10 text-gray-500" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-java-orange rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Quiz Premium
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Aby uzyskać dostęp do ekskluzywnych quizów musisz się zalogować
              </p>
              <button className="bg-java-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Zaloguj się
              </button>
            </div>
          </div>
        )}

        <div className={isBlocked ? 'blur-sm' : ''}>
          {/* Header with Icon */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-java-orange rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                <FireIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-java-orange uppercase tracking-wider">Quiz</span>
                <span className="text-xs text-gray-500">#{quiz.id.toString().padStart(3, '0')}</span>
              </div>
            </div>
            {!isBlocked && (
              <button
                onClick={handleClick}
                className="group/play relative w-14 h-14 bg-java-orange hover:bg-orange-600 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl"
              >
                <PlayIcon className="w-6 h-6 text-white transform group-hover/play:scale-125 transition-transform duration-200" />
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/play:opacity-100 transition-opacity duration-200" />
              </button>
            )}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
            {quiz.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
            {quiz.description}
          </p>

          {/* Stats Bar */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-500">
                <CalendarIcon className="w-4 h-4" />
                <span className="text-xs font-medium">{formatDate(quiz.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <UserIcon className="w-4 h-4" />
                <span className="text-xs font-medium">ID: {quiz.userId}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-green-600">Dostępny</span>
            </div>
          </div>

          {/* Difficulty Indicator */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500">Poziom:</span>
              <div className="flex space-x-1">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`w-2 h-2 rounded-full ${
                      level <= 2 
                        ? 'bg-java-orange' 
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-java-orange">Średni</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <SparklesIcon className="w-3 h-3" />
              <span>+50 XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      {!isBlocked && (
        <div className="absolute inset-0 rounded-2xl bg-java-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl transform scale-110" />
      )}
    </div>
  )
})

QuizCard.displayName = 'QuizCard' 