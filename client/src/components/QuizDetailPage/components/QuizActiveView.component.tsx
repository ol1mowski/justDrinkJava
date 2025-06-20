import { memo } from 'react'
import { QuizHeader, QuizProgress, QuizQuestion, QuizNavigation } from './'
import type { QuizData, QuizContentData } from '../../../api/types.api'

interface QuizActiveViewProps {
  quiz: QuizData
  questions: QuizContentData[]
  currentQuestionIndex: number
  selectedAnswers: Record<number, string[]>
  timeRemaining: number
  progress: number
  onAnswerSelect: (questionId: number, optionId: string, isMultiple: boolean) => void
  onNextQuestion: () => void
  onPreviousQuestion: () => void
  onSubmitQuiz: () => void
  hasAnswered: (index: number) => boolean
}

export const QuizActiveView = memo<QuizActiveViewProps>(({
  quiz,
  questions,
  currentQuestionIndex,
  selectedAnswers,
  timeRemaining,
  progress,
  onAnswerSelect,
  onNextQuestion,
  onPreviousQuestion,
  onSubmitQuiz,
  hasAnswered
}) => {
  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <QuizHeader
          title={quiz.title}
          description={quiz.description}
          category={quiz.category}
          difficulty={quiz.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard'}
          timeRemaining={timeRemaining}
          onSubmit={onSubmitQuiz}
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
            onAnswerSelect(currentQuestion.id, optionId, isMultiple)
          }
        />

        <QuizNavigation
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onNext={onNextQuestion}
          onPrevious={onPreviousQuestion}
          onSubmit={onSubmitQuiz}
          hasAnswered={hasAnswered(currentQuestionIndex)}
        />
      </div>
    </div>
  )
})

QuizActiveView.displayName = 'QuizActiveView' 