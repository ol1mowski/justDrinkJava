import { useState, useCallback, useEffect } from 'react'
import type { QuizContentData, QuizResultData } from '../api/types.api'

interface UseQuizStateReturn {
  currentQuestionIndex: number
  selectedAnswers: Record<number, string[]>
  isCompleted: boolean
  timeRemaining: number
  startTime: Date | null
  results: QuizResultData | null
  
  setCurrentQuestion: (index: number) => void
  selectAnswer: (questionId: number, optionId: string, isMultiple: boolean) => void
  nextQuestion: () => void
  previousQuestion: () => void
  completeQuiz: (results: QuizResultData) => void
  resetQuiz: () => void
  
  progress: number
  hasAnswered: (questionIndex: number) => boolean
  getTimeSpent: () => number
  canGoNext: boolean
  canGoPrevious: boolean
}

interface UseQuizStateProps {
  questions: QuizContentData[]
  timeLimit: number 
}

export const useQuizState = ({ questions, timeLimit }: UseQuizStateProps): UseQuizStateReturn => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string[]>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60) 
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [results, setResults] = useState<QuizResultData | null>(null)

  useEffect(() => {
    if (questions.length > 0 && !startTime) {
      setStartTime(new Date())
    }
  }, [questions.length, startTime])

  useEffect(() => {
    if (!startTime || isCompleted || timeRemaining <= 0) return

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsCompleted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime, isCompleted, timeRemaining])

  const setCurrentQuestion = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index)
    }
  }, [questions.length])

  const selectAnswer = useCallback((questionId: number, optionId: string, isMultiple: boolean) => {
    setSelectedAnswers(prev => {
      const currentAnswers = prev[questionId] || []
      
      if (isMultiple) {
        if (currentAnswers.includes(optionId)) {
          return {
            ...prev,
            [questionId]: currentAnswers.filter(id => id !== optionId)
          }
        } else {
          return {
            ...prev,
            [questionId]: [...currentAnswers, optionId]
          }
        }
      } else {      
        return {
          ...prev,
          [questionId]: [optionId]
        }
      }
    })
  }, [])

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }, [currentQuestionIndex, questions.length])

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }, [currentQuestionIndex])

  const completeQuiz = useCallback((quizResults: QuizResultData) => {
    setResults(quizResults)
    setIsCompleted(true)
  }, [])

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setIsCompleted(false)
    setTimeRemaining(timeLimit * 60)
    setStartTime(new Date())
    setResults(null)
  }, [timeLimit])

  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0

  const hasAnswered = useCallback((questionIndex: number) => {
    if (questionIndex >= questions.length) return false
    const question = questions[questionIndex]
    const answers = selectedAnswers[question.id]
    return answers && answers.length > 0
  }, [questions, selectedAnswers])

  const getTimeSpent = useCallback(() => {
    if (!startTime) return 0
    const now = new Date()
    return Math.floor((now.getTime() - startTime.getTime()) / 1000)
  }, [startTime])

  const canGoNext = currentQuestionIndex < questions.length - 1
  const canGoPrevious = currentQuestionIndex > 0

  return {
    currentQuestionIndex,
    selectedAnswers,
    isCompleted,
    timeRemaining,
    startTime,
    results,
    setCurrentQuestion,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    resetQuiz,
    progress,
    hasAnswered,
    getTimeSpent,
    canGoNext,
    canGoPrevious
  }
} 