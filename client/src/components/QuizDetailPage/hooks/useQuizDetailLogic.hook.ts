import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/auth/useAuth.hook'
import { useQuizData } from '../../../hooks/useQuizData.hook'
import { useQuizState } from '../../../hooks/useQuizState.hook'

export const useQuizDetailLogic = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const quizId = id ? parseInt(id, 10) : null

  const isPremiumQuiz = quizId !== null && quizId > 1
  const hasAccess = isAuthenticated || !isPremiumQuiz

  const {
    quiz,
    questions,
    loading,
    questionsLoading,
    error,
    questionsError,
    loadQuiz,
    loadQuestions,
    submitAnswers
  } = useQuizData()

  const {
    currentQuestionIndex,
    selectedAnswers,
    isCompleted,
    timeRemaining,
    results,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    resetQuiz,
    progress,
    hasAnswered,
    getTimeSpent
  } = useQuizState({
    questions,
    timeLimit: quiz?.timeLimit || 15
  })

  useEffect(() => {
    if (quizId && hasAccess) {
      loadQuiz(quizId)
      loadQuestions(quizId)
    }
  }, [quizId, hasAccess, loadQuiz, loadQuestions])

  const handleAnswerSelect = (questionId: number, optionId: string, isMultiple: boolean) => {
    selectAnswer(questionId, optionId, isMultiple)
  }

  const handleNextQuestion = () => {
    nextQuestion()
  }

  const handlePreviousQuestion = () => {
    previousQuestion()
  }

  const handleSubmitQuiz = async () => {
    if (!quiz) return

    const request = {
      quizId: quiz.id,
      answers: selectedAnswers,
      timeSpent: getTimeSpent()
    }

    const result = await submitAnswers(request)
    if (result) {
      completeQuiz(result)
    }
  }

  const handleRestartQuiz = () => {
    resetQuiz()
  }

  const navigateToQuizzes = () => {
    navigate('/quizzes')
  }

  const navigateToLogin = () => {
    navigate('/login')
  }

  return {
    quiz,
    questions,
    loading,
    questionsLoading,
    error,
    questionsError,
    hasAccess,
    isCompleted,
    results,
    currentQuestionIndex,
    selectedAnswers,
    timeRemaining,
    progress,
    
    handleAnswerSelect,
    handleNextQuestion,
    handlePreviousQuestion,
    handleSubmitQuiz,
    handleRestartQuiz,
    navigateToQuizzes,
    navigateToLogin,
    hasAnswered: (index: number) => hasAnswered(index)
  }
} 