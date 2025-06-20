import { useCallback } from 'react'

interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

interface QuizQuestionData {
  id: number
  question: string
  type: 'single' | 'multiple'
  options: QuizOption[]
  explanation: string
}

interface UseQuizQuestionProps {
  question: QuizQuestionData
  selectedAnswers: string[]
  onAnswerSelect: (optionId: string, isMultiple: boolean) => void
}

export const useQuizQuestion = ({ 
  question, 
  selectedAnswers, 
  onAnswerSelect 
}: UseQuizQuestionProps) => {
  
  const handleOptionClick = useCallback((optionId: string) => {
    onAnswerSelect(optionId, question.type === 'multiple')
  }, [onAnswerSelect, question.type])

  const isSelected = useCallback((optionId: string) => {
    return selectedAnswers.includes(optionId)
  }, [selectedAnswers])

  const getOptionLabel = useCallback((index: number) => {
    return String.fromCharCode(97 + index).toUpperCase()
  }, [])

  const getQuestionTypeLabel = useCallback(() => {
    return question.type === 'multiple' ? 'Wielokrotny wybór' : 'Pojedynczy wybór'
  }, [question.type])

  const getSelectedCount = useCallback(() => {
    return selectedAnswers.length
  }, [selectedAnswers.length])

  const getSelectedCountText = useCallback(() => {
    const count = selectedAnswers.length
    return `Wybrano: ${count} odpowied${count === 1 ? 'ź' : 'zi'}`
  }, [selectedAnswers.length])

  return {
    handleOptionClick,
    isSelected,
    getOptionLabel,
    getQuestionTypeLabel,
    getSelectedCount,
    getSelectedCountText
  }
} 