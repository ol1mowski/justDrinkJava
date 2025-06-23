import { memo } from 'react';

interface QuestionHeaderProps {
  questionId: number;
  questionType: string;
  questionTypeLabel: string;
}

export const QuestionHeader = memo<QuestionHeaderProps>(
  ({ questionId, questionTypeLabel }) => {
    return (
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-java-orange rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">{questionId}</span>
        </div>
        <span className="text-sm font-medium text-java-orange uppercase tracking-wider">
          {questionTypeLabel}
        </span>
      </div>
    );
  }
);

QuestionHeader.displayName = 'QuestionHeader';
