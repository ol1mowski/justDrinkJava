import { memo } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { formatTime } from '../utils/quizResults.utils';

interface StatisticsGridProps {
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
}

export const StatisticsGrid = memo<StatisticsGridProps>(
  ({ correctAnswers, totalQuestions, timeSpent }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 shadow-md hover:shadow-lg transition-shadow">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6 shadow-md">
            <CheckCircleIcon className="w-8 h-8 text-white" />
          </div>
          <div className="text-4xl font-bold text-green-600 mb-2">
            {correctAnswers}
          </div>
          <div className="text-green-700 font-medium text-lg">
            Poprawne odpowiedzi
          </div>
        </div>

        <div className="text-center p-8 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border-2 border-red-200 shadow-md hover:shadow-lg transition-shadow">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-6 shadow-md">
            <XCircleIcon className="w-8 h-8 text-white" />
          </div>
          <div className="text-4xl font-bold text-red-600 mb-2">
            {totalQuestions - correctAnswers}
          </div>
          <div className="text-red-700 font-medium text-lg">
            Błędne odpowiedzi
          </div>
        </div>

        <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-md hover:shadow-lg transition-shadow">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6 shadow-md">
            <ClockIcon className="w-8 h-8 text-white" />
          </div>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {formatTime(timeSpent)}
          </div>
          <div className="text-blue-700 font-medium text-lg">
            Czas rozwiązywania
          </div>
        </div>
      </div>
    );
  }
);

StatisticsGrid.displayName = 'StatisticsGrid';
