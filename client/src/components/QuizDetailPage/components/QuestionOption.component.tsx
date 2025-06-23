import { memo } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuestionOptionProps {
  option: QuizOption;
  isSelected: boolean;
  questionType: 'single' | 'multiple';
  optionLabel: string;
  onOptionClick: (optionId: string) => void;
}

const optionMarkdownComponents: Components = {
  p: ({ children }) => (
    <span className="text-sm leading-relaxed">{children}</span>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">
      {children}
    </code>
  ),
};

export const QuestionOption = memo<QuestionOptionProps>(
  ({ option, isSelected, questionType, optionLabel, onOptionClick }) => {
    return (
      <button
        onClick={() => onOptionClick(option.id)}
        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                 hover:border-java-orange hover:bg-java-orange/5 focus:outline-none focus:ring-2 
                 focus:ring-java-orange focus:ring-offset-2 ${
                   isSelected
                     ? 'border-java-orange bg-java-orange/10 text-java-gray dark:text-java-dark-text'
                     : 'border-gray-200 dark:border-java-dark-border bg-gray-50 dark:bg-java-dark-bg text-gray-700 dark:text-java-dark-text-secondary'
                 }`}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              isSelected
                ? 'border-java-orange bg-java-orange'
                : 'border-gray-300 dark:border-java-dark-border'
            }`}
          >
            {isSelected &&
              (questionType === 'multiple' ? (
                <CheckCircleIcon className="w-4 h-4 text-white" />
              ) : (
                <div className="w-2 h-2 bg-white rounded-full" />
              ))}
          </div>

          <div className="flex items-center space-x-3">
            <span
              className={`font-medium text-sm ${
                isSelected
                  ? 'text-java-orange'
                  : 'text-gray-500 dark:text-java-dark-text-secondary'
              }`}
            >
              {optionLabel}.
            </span>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={optionMarkdownComponents}
              >
                {option.text}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </button>
    );
  }
);

QuestionOption.displayName = 'QuestionOption';
