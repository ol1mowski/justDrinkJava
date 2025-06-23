import { memo } from 'react';

export const QuizzesLoading = memo(() => {
  return (
    <div className="min-h-screen py-16 lg:py-24 bg-java-white dark:bg-java-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-java-orange mx-auto"></div>
          <p className="mt-4 text-java-gray dark:text-java-dark-text">
            Ładowanie quizów...
          </p>
        </div>
      </div>
    </div>
  );
});

QuizzesLoading.displayName = 'QuizzesLoading';
