import { memo } from 'react';
import { CircleStackIcon } from '@heroicons/react/24/outline';

interface QuestionSummaryProps {
  selectedCount: number;
  selectedCountText: string;
}

export const QuestionSummary = memo<QuestionSummaryProps>(
  ({ selectedCount, selectedCountText }) => {
    if (selectedCount === 0) {
      return null;
    }

    return (
      <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200 shadow-sm">
        <div className="flex items-center space-x-2 text-emerald-700">
          <CircleStackIcon className="w-5 h-5" />
          <span className="text-sm font-medium">{selectedCountText}</span>
        </div>
      </div>
    );
  }
);

QuestionSummary.displayName = 'QuestionSummary';
