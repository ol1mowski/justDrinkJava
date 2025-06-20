import { memo } from 'react'
import { QuestionHeader } from './QuestionHeader.component'
import { QuestionContent } from './QuestionContent.component'
import { QuestionOptionsList } from './QuestionOptionsList.component'
import { QuestionSummary } from './QuestionSummary.component'
import { useQuizQuestion } from './hooks/useQuizQuestion.hook'

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

interface QuizQuestionProps {
  question: QuizQuestionData
  selectedAnswers: string[]
  onAnswerSelect: (optionId: string, isMultiple: boolean) => void
}

export const QuizQuestion = memo<QuizQuestionProps>(({ 
  question, 
  selectedAnswers, 
  onAnswerSelect 
}) => {
  const {
    handleOptionClick,
    isSelected,
    getOptionLabel,
    getQuestionTypeLabel,
    getSelectedCount,
    getSelectedCountText
  } = useQuizQuestion({ question, selectedAnswers, onAnswerSelect })

  return (
    <div className="bg-white dark:bg-java-dark-surface rounded-xl shadow-lg border border-gray-200 dark:border-java-dark-border p-8 mb-8">
      <div className="mb-6">
        <QuestionHeader
          questionId={question.id}
          questionType={question.type}
          questionTypeLabel={getQuestionTypeLabel()}
        />
        
        <QuestionContent
          question={question.question}
          questionType={question.type}
        />
      </div>

      <QuestionOptionsList
        options={question.options}
        questionType={question.type}
        isSelected={isSelected}
        getOptionLabel={getOptionLabel}
        onOptionClick={handleOptionClick}
      />

      <QuestionSummary
        selectedCount={getSelectedCount()}
        selectedCountText={getSelectedCountText()}
      />
    </div>
  )
})

QuizQuestion.displayName = 'QuizQuestion' 