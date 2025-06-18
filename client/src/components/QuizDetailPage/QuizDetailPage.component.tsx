import { memo } from 'react'
// import { useParams } from 'react-router-dom'
import { 
  QuizHeader, 
  QuizProgress, 
  QuizQuestion, 
  QuizNavigation, 
  QuizResults 
} from './components'
import { ErrorBoundaryWrapper } from '../ui'

// Dummy data
const DUMMY_QUIZ = {
  id: 1,
  title: 'Java Podstawy - Test Wiedzy',
  description: 'Sprawdź swoją wiedzę na temat podstaw programowania w Javie',
  totalQuestions: 10,
  timeLimit: 15, // minuty
  difficulty: 'medium' as const,
  category: 'Java Fundamentals',
  questions: [
    {
      id: 1,
      question: 'Która z poniższych opcji jest poprawną deklaracją zmiennej typu int w Javie?',
      type: 'single' as const,
      options: [
        { id: 'a', text: 'int number = 10;', isCorrect: true },
        { id: 'b', text: 'integer number = 10;', isCorrect: false },
        { id: 'c', text: 'int number := 10;', isCorrect: false },
        { id: 'd', text: 'var number = 10;', isCorrect: false }
      ],
      explanation: 'W Javie zmienne typu int deklaruje się używając słowa kluczowego "int", po którym następuje nazwa zmiennej i opcjonalnie inicjalizacja.'
    },
    {
      id: 2,
      question: 'Co oznacza OOP w kontekście programowania?',
      type: 'single' as const,
      options: [
        { id: 'a', text: 'Object Oriented Programming', isCorrect: true },
        { id: 'b', text: 'Only One Program', isCorrect: false },
        { id: 'c', text: 'Open Operation Protocol', isCorrect: false },
        { id: 'd', text: 'Optimal Output Processing', isCorrect: false }
      ],
      explanation: 'OOP to skrót od Object Oriented Programming (Programowanie Obiektowe), które jest paradygmatem programowania opartym na koncepcji obiektów.'
    },
    {
      id: 3,
      question: 'Które z poniższych są podstawowymi zasadami OOP? (Zaznacz wszystkie poprawne)',
      type: 'multiple' as const,
      options: [
        { id: 'a', text: 'Enkapsulacja', isCorrect: true },
        { id: 'b', text: 'Dziedziczenie', isCorrect: true },
        { id: 'c', text: 'Polimorfizm', isCorrect: true },
        { id: 'd', text: 'Kompilacja', isCorrect: false }
      ],
      explanation: 'Podstawowe zasady OOP to: Enkapsulacja, Dziedziczenie, Polimorfizm i Abstrakcja. Kompilacja nie jest zasadą OOP.'
    }
  ]
}

export const QuizDetailPage = memo(() => {
  // const { id } = useParams<{ id: string }>() // TODO: Use for API call
  
  // Stan quizu - w przyszłości z hooka
  const currentQuestionIndex = 0
  const selectedAnswers: Record<number, string[]> = {}
  const isCompleted = false
  const timeRemaining = 15 * 60 // 15 minut w sekundach

  const currentQuestion = DUMMY_QUIZ.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / DUMMY_QUIZ.totalQuestions) * 100

  const handleAnswerSelect = (questionId: number, optionId: string, isMultiple: boolean) => {
    console.log('Answer selected:', { questionId, optionId, isMultiple })
    // TODO: Implementacja wyboru odpowiedzi
  }

  const handleNextQuestion = () => {
    console.log('Next question')
    // TODO: Implementacja przejścia do następnego pytania
  }

  const handlePreviousQuestion = () => {
    console.log('Previous question')
    // TODO: Implementacja powrotu do poprzedniego pytania
  }

  const handleSubmitQuiz = () => {
    console.log('Submit quiz')
    // TODO: Implementacja wysłania quizu
  }

  const handleRestartQuiz = () => {
    console.log('Restart quiz')
    // TODO: Implementacja restartu quizu
  }

  if (isCompleted) {
    return (
      <ErrorBoundaryWrapper
        title="Błąd wyników quizu"
        message="Wystąpił problem podczas wyświetlania wyników"
      >
        <div className="min-h-screen bg-java-white dark:bg-java-dark-bg">
          <QuizResults
            quiz={DUMMY_QUIZ}
            userAnswers={selectedAnswers}
            score={85}
            totalQuestions={DUMMY_QUIZ.totalQuestions}
            correctAnswers={8}
            timeSpent={12 * 60}
            onRestart={handleRestartQuiz}
          />
        </div>
      </ErrorBoundaryWrapper>
    )
  }

  return (
    <ErrorBoundaryWrapper
      title="Błąd quizu"
      message="Wystąpił problem podczas ładowania quizu"
    >
      <div className="min-h-screen bg-java-white dark:bg-java-dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <QuizHeader
            title={DUMMY_QUIZ.title}
            description={DUMMY_QUIZ.description}
            category={DUMMY_QUIZ.category}
            difficulty={DUMMY_QUIZ.difficulty}
            timeRemaining={timeRemaining}
            onSubmit={handleSubmitQuiz}
          />

          <QuizProgress
            current={currentQuestionIndex + 1}
            total={DUMMY_QUIZ.totalQuestions}
            progress={progress}
          />

          <QuizQuestion
            question={currentQuestion}
            selectedAnswers={selectedAnswers[currentQuestion.id] || []}
            onAnswerSelect={(optionId: string, isMultiple: boolean) => 
              handleAnswerSelect(currentQuestion.id, optionId, isMultiple)
            }
          />

          <QuizNavigation
            currentIndex={currentQuestionIndex}
            totalQuestions={DUMMY_QUIZ.totalQuestions}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
            onSubmit={handleSubmitQuiz}
            hasAnswered={selectedAnswers[currentQuestion.id]?.length > 0}
          />
        </div>
      </div>
    </ErrorBoundaryWrapper>
  )
})

QuizDetailPage.displayName = 'QuizDetailPage' 