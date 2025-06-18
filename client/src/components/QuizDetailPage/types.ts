export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface QuizQuestionData {
  id: number
  question: string
  type: 'single' | 'multiple'
  options: QuizOption[]
  explanation: string
}

export interface QuizData {
  id: number
  title: string
  description: string
  totalQuestions: number
  timeLimit: number // minuty
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  questions: QuizQuestionData[]
}

export interface QuizState {
  currentQuestionIndex: number
  selectedAnswers: Record<number, string[]>
  isCompleted: boolean
  timeRemaining: number
  startTime: Date
}

export interface QuizResultsData {
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  userAnswers: Record<number, string[]>
} 