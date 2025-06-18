import { useState, useEffect } from 'react'
import { quizService } from '../../../api'
import type { Quiz } from '../types'
import type { QuizData } from '../../../api/types.api'

interface UseQuizzesReturn {
  quizzes: Quiz[]
  loading: boolean
  error: string | null
  refetch: () => void
}

const mapQuizData = (apiQuiz: QuizData): Quiz => ({
  id: apiQuiz.id,
  title: apiQuiz.title,
  description: apiQuiz.description,
  category: apiQuiz.category,
  difficulty: apiQuiz.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
  questionsCount: apiQuiz.questions?.length || 0,
  timeLimit: apiQuiz.timeLimit,
  createdAt: new Date(apiQuiz.createdAt).toLocaleDateString('pl-PL'),
  imageUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=400&h=300&fit=crop` 
})

export const useQuizzes = (): UseQuizzesReturn => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchQuizzes = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await quizService.getAll(0, 20) 
      const quizzesData = response.data?.content || []
      const mappedQuizzes = quizzesData.map(mapQuizData)
      setQuizzes(mappedQuizzes)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd podczas ładowania quizów'
      setError(errorMessage)
      console.error('❌ Błąd ładowania quizów:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuizzes()
  }, [])

  return {
    quizzes,
    loading,
    error,
    refetch: fetchQuizzes
  }
} 