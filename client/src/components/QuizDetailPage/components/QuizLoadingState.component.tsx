import { memo } from 'react';
import { LoadingSpinner } from '../../ui';

export const QuizLoadingState = memo(() => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
});

QuizLoadingState.displayName = 'QuizLoadingState';
