import { useState, useCallback } from 'react'
import { quizService } from '../api'
import type { QuizData, QuizContentData, QuizResultData, QuizAnswerRequest } from '../api/types.api'

interface UseQuizDataReturn {   
  quiz: QuizData | null
  questions: QuizContentData[]
  
  loading: boolean
  questionsLoading: boolean
  submitting: boolean
  
  error: string | null
  questionsError: string | null
  submitError: string | null
    
  loadQuiz: (id: number) => Promise<void>
  loadQuestions: (id: number) => Promise<void>
  submitAnswers: (request: QuizAnswerRequest) => Promise<QuizResultData | null>
  reset: () => void
}

export const useQuizData = (): UseQuizDataReturn => {
  const [quiz, setQuiz] = useState<QuizData | null>(null)
  const [questions, setQuestions] = useState<QuizContentData[]>([])
  
  const [loading, setLoading] = useState(false)
  const [questionsLoading, setQuestionsLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  const [error, setError] = useState<string | null>(null)
  const [questionsError, setQuestionsError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const loadQuiz = useCallback(async (id: number) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await quizService.getById(id)
      setQuiz(response.data || null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd podczas ładowania quizu'
      setError(errorMessage)
      console.error('❌ Błąd ładowania quizu:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadQuestions = useCallback(async (id: number) => {
    setQuestionsLoading(true)
    setQuestionsError(null)
    
    try {
      const response = await quizService.getQuestions(id)
      setQuestions(response.data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd podczas ładowania pytań'
      setQuestionsError(errorMessage)
      console.error('❌ Błąd ładowania pytań:', err)
    } finally {
      setQuestionsLoading(false)
    }
  }, [])

  const submitAnswers = useCallback(async (request: QuizAnswerRequest): Promise<QuizResultData | null> => {
    setSubmitting(true)
    setSubmitError(null)
    
    try {
      const response = await quizService.checkAnswers(request)
      return response.data || null
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Błąd podczas sprawdzania odpowiedzi'
      setSubmitError(errorMessage)
      console.error('❌ Błąd sprawdzania odpowiedzi:', err)
      return null
    } finally {
      setSubmitting(false)
    }
  }, [])

  const reset = useCallback(() => {
    setQuiz(null)
    setQuestions([])
    setError(null)
    setQuestionsError(null)
    setSubmitError(null)
    setLoading(false)
    setQuestionsLoading(false)
    setSubmitting(false)
  }, [])

  return {
    quiz,
    questions,
    loading,
    questionsLoading,
    submitting,
    error,
    questionsError,
    submitError,
    loadQuiz,
    loadQuestions,
    submitAnswers,
    reset
  }
} 