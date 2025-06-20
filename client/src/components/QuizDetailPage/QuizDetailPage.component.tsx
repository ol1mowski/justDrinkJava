import { memo } from 'react'
import { 
  QuizPremiumGuard,
  QuizLoadingState,
  QuizErrorState,
  QuizNotFoundState,
  QuizActiveView,
  QuizResults
} from './components'
import { ErrorBoundaryWrapper } from '../ui'
import { useQuizDetailLogic } from './hooks'

export const QuizDetailPage = memo(() => {
  const {
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
    hasAnswered
  } = useQuizDetailLogic()

  if (!hasAccess) {
    return (
      <QuizPremiumGuard
        onNavigateToLogin={navigateToLogin}
        onNavigateToQuizzes={navigateToQuizzes}
      />
    )
  }

  if (loading || questionsLoading) {
    return <QuizLoadingState />
  }

  if (error || questionsError) {
    return (
      <QuizErrorState
        error={error || questionsError || 'Nieznany błąd'}
        onNavigateToQuizzes={navigateToQuizzes}
      />
    )
  }

  if (!quiz || questions.length === 0) {
    return (
      <QuizNotFoundState
        onNavigateToQuizzes={navigateToQuizzes}
      />
    )
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
      <QuizActiveView
        quiz={quiz}
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        selectedAnswers={selectedAnswers}
        timeRemaining={timeRemaining}
        progress={progress}
        onAnswerSelect={handleAnswerSelect}
        onNextQuestion={handleNextQuestion}
        onPreviousQuestion={handlePreviousQuestion}
        onSubmitQuiz={handleSubmitQuiz}
        hasAnswered={hasAnswered}
      />
    </ErrorBoundaryWrapper>
  )
})

QuizDetailPage.displayName = 'QuizDetailPage' 