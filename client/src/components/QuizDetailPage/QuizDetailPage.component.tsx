import { memo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { LockClosedIcon, HomeIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { 
  QuizHeader, 
  QuizProgress, 
  QuizQuestion, 
  QuizNavigation, 
  QuizResults 
} from './components'
import { ErrorBoundaryWrapper, Button } from '../ui'
import { useQuizData } from '../../hooks/useQuizData.hook'
import { useQuizState } from '../../hooks/useQuizState.hook'
import { LoadingSpinner } from '../ui'
import { useAuth } from '../../hooks/auth/useAuth.hook'

export const QuizDetailPage = memo(() => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const quizId = id ? parseInt(id, 10) : null

  // Sprawdzamy czy quiz jest premium (wszystkie quizy z id > 1 są premium)
  // Logika zgodna z QuizzesGrid.component.tsx (index > 0)
  // Quiz z id=1 jest darmowy, pozostałe są premium
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

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center">
            <div className="mb-8">
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <LockClosedIcon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-java-orange to-java-red rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                Quiz Premium
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Aby uzyskać dostęp do ekskluzywnych quizów i zdobywać punkty, musisz się zalogować do swojego konta.
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => navigate('/login')}
                rightIcon={<ArrowRightIcon className="w-5 h-5" />}
                className="bg-gradient-to-r from-java-orange to-java-red hover:from-java-red hover:to-java-orange shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Zaloguj się
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={() => navigate('/quizzes')}
                leftIcon={<HomeIcon className="w-5 h-5" />}
                className="border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 cursor-pointer"
              >
                Powrót do quizów
              </Button>
            </div>
            
            <div className="pt-6 border-t border-gray-200/60">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Quiz #1</span>
                </div>
                <span>•</span>
                <span>dostępny bez logowania</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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