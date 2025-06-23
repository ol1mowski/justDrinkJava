import { memo } from 'react';

interface QuizzesErrorProps {
  error: string;
}

export const QuizzesError = memo<QuizzesErrorProps>(({ error }) => {
  return (
    <div className="min-h-screen py-16 lg:py-24 bg-java-white dark:bg-java-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">❌ {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-java-orange hover:bg-java-orange/90 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    </div>
  );
});

QuizzesError.displayName = 'QuizzesError';
