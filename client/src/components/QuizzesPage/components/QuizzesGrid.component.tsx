import { memo } from 'react'
import { QuizCard } from './QuizCard.component'
import type { Quiz } from '../types'

interface QuizzesGridProps {
  quizzes: Quiz[]
  isAuthenticated: boolean
  onStartQuiz: (quizId: number) => void
}

export const QuizzesGrid = memo<QuizzesGridProps>(({ 
  quizzes, 
  isAuthenticated, 
  onStartQuiz 
}) => {
  if (quizzes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🧠</div>
        <p className="text-lg text-java-blue/90 dark:text-java-dark-text-secondary">
          Brak dostępnych quizów
        </p>
        <p className="text-sm text-java-gray/70 dark:text-java-dark-text-secondary mt-2">
          Quizy będą wkrótce dostępne!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz, index) => (
        <QuizCard
          key={quiz.id}
          quiz={quiz}
          isBlocked={!isAuthenticated && index > 0}
          onStartQuiz={onStartQuiz}
        />
      ))}
    </div>
  )
})

QuizzesGrid.displayName = 'QuizzesGrid' 