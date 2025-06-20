import { memo } from 'react'
import { QuestionOption } from './QuestionOption.component'

interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

interface QuestionOptionsListProps {
  options: QuizOption[]
  questionType: 'single' | 'multiple'
  isSelected: (optionId: string) => boolean
  getOptionLabel: (index: number) => string
  onOptionClick: (optionId: string) => void
}

export const QuestionOptionsList = memo<QuestionOptionsListProps>(({
  options,
  questionType,
  isSelected,
  getOptionLabel,
  onOptionClick
}) => {
  return (
    <div className="space-y-3">
      {options.map((option, index) => (
        <QuestionOption
          key={option.id}
          option={option}
          isSelected={isSelected(option.id)}
          questionType={questionType}
          optionLabel={getOptionLabel(index)}
          onOptionClick={onOptionClick}
        />
      ))}
    </div>
  )
})

QuestionOptionsList.displayName = 'QuestionOptionsList' 