import { memo } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { CircleStackIcon } from '@heroicons/react/24/outline'

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
  const handleOptionClick = (optionId: string) => {
    onAnswerSelect(optionId, question.type === 'multiple')
  }

  const isSelected = (optionId: string) => selectedAnswers.includes(optionId)

  return (
    <div className="bg-white dark:bg-java-dark-surface rounded-xl shadow-lg border border-gray-200 dark:border-java-dark-border p-8 mb-8">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-java-orange rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{question.id}</span>
          </div>
          <span className="text-sm font-medium text-java-orange uppercase tracking-wider">
            {question.type === 'multiple' ? 'Wielokrotny wybór' : 'Pojedynczy wybór'}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-java-gray dark:text-java-dark-text leading-relaxed">
          {question.question}
        </h3>
        
        {question.type === 'multiple' && (
          <p className="text-sm text-gray-500 dark:text-java-dark-text-secondary mt-2">
            Zaznacz wszystkie poprawne odpowiedzi
          </p>
        )}
      </div>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                       hover:border-java-orange hover:bg-java-orange/5 focus:outline-none focus:ring-2 
                       focus:ring-java-orange focus:ring-offset-2 ${
              isSelected(option.id)
                ? 'border-java-orange bg-java-orange/10 text-java-gray dark:text-java-dark-text'
                : 'border-gray-200 dark:border-java-dark-border bg-gray-50 dark:bg-java-dark-bg text-gray-700 dark:text-java-dark-text-secondary'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                isSelected(option.id)
                  ? 'border-java-orange bg-java-orange'
                  : 'border-gray-300 dark:border-java-dark-border'
              }`}>
                {isSelected(option.id) && (
                  question.type === 'multiple' ? (
                    <CheckCircleIcon className="w-4 h-4 text-white" />
                  ) : (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`font-medium text-sm ${
                  isSelected(option.id) 
                    ? 'text-java-orange' 
                    : 'text-gray-500 dark:text-java-dark-text-secondary'
                }`}>
                  {option.id.toUpperCase()}.
                </span>
                <span className="text-sm leading-relaxed">
                  {option.text}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedAnswers.length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
            <CircleStackIcon className="w-5 h-5" />
            <span className="text-sm font-medium">
              Wybrano: {selectedAnswers.length} odpowied{selectedAnswers.length === 1 ? 'ź' : 'zi'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
})

QuizQuestion.displayName = 'QuizQuestion' 