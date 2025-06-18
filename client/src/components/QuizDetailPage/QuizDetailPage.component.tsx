import { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { 
  QuizHeader, 
  QuizProgress, 
  QuizQuestion, 
  QuizNavigation, 
  QuizResults 
} from './components'
import { ErrorBoundaryWrapper } from '../ui'
import { useQuizData } from '../../hooks/useQuizData.hook'
import { useQuizState } from '../../hooks/useQuizState.hook'
import { LoadingSpinner } from '../ui'

export const QuizDetailPage = memo(() => {
  const { id } = useParams<{ id: string }>()
  const quizId = id ? parseInt(id, 10) : null

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
    if (quizId) {
      loadQuiz(quizId)
      loadQuestions(quizId)
    }
  }, [quizId, loadQuiz, loadQuestions])

  if (loading || questionsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || questionsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Błąd ładowania quizu</h2>
          <p className="text-gray-600 mb-6">
            {error || questionsError}
          </p>
          <button
            onClick={() => window.location.href = '/quizzes'}
            className="bg-java-orange hover:bg-java-red text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Powrót do quizów
          </button>
        </div>
      </div>
    )
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Quiz nie został znaleziony</h2>
          <button
            onClick={() => window.location.href = '/quizzes'}
            className="bg-java-orange hover:bg-java-red text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Powrót do quizów
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

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

  if (isCompleted && results) {
    return (
      <ErrorBoundaryWrapper
        title="Błąd wyników quizu"
        message="Wystąpił problem podczas wyświetlania wyników"
      >
        <QuizResults
          quiz={quiz}
          userAnswers={selectedAnswers}
          score={results.score}
          totalQuestions={results.totalQuestions}
          correctAnswers={results.correctAnswers}
          timeSpent={results.timeSpent}
          onRestart={handleRestartQuiz}
        />
      </ErrorBoundaryWrapper>
    )
  }

  return (
    <ErrorBoundaryWrapper
      title="Błąd quizu"
      message="Wystąpił problem podczas ładowania quizu"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <QuizHeader
            title={quiz.title}
            description={quiz.description}
            category={quiz.category}
            difficulty={quiz.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
            timeRemaining={timeRemaining}
            onSubmit={handleSubmitQuiz}
          />

          <QuizProgress
            current={currentQuestionIndex + 1}
            total={questions.length}
            progress={progress}
          />

          <QuizQuestion
            question={{
              id: currentQuestion.id,
              question: currentQuestion.question,
              type: currentQuestion.options.length > 4 ? 'multiple' : 'single',
              options: currentQuestion.options.map((option, _) => ({
                id: option, 
                text: option,
                isCorrect: false 
              })),
              explanation: ''
            }}
            selectedAnswers={selectedAnswers[currentQuestion.id] || []}
            onAnswerSelect={(optionId: string, isMultiple: boolean) => 
              handleAnswerSelect(currentQuestion.id, optionId, isMultiple)
            }
          />

          <QuizNavigation
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
            onSubmit={handleSubmitQuiz}
            hasAnswered={hasAnswered(currentQuestionIndex)}
          />
        </div>
      </div>
    </ErrorBoundaryWrapper>
  )
})

QuizDetailPage.displayName = 'QuizDetailPage' 