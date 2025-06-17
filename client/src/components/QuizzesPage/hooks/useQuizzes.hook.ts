import { useState, useEffect } from 'react'
import type { Quiz } from '../types'

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:8080/api/quizzes')
        
        if (!response.ok) {
          throw new Error('Nie udało się pobrać quizów')
        }
        
        const data = await response.json()
        setQuizzes(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Wystąpił błąd')
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  return { quizzes, loading, error }
} 