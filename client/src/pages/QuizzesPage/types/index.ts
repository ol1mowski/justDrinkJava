export interface Quiz {
  id: number
  userId: number
  title: string
  description: string
  createdAt: string
}

export interface QuizCardProps {
  quiz: Quiz
  isBlocked?: boolean
  onStartQuiz?: (quizId: number) => void
} 