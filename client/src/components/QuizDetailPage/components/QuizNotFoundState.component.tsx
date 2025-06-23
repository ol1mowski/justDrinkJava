import { memo } from 'react';

interface QuizNotFoundStateProps {
  onNavigateToQuizzes: () => void;
}

export const QuizNotFoundState = memo<QuizNotFoundStateProps>(
  ({ onNavigateToQuizzes }) => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            Quiz nie został znaleziony
          </h2>
          <button
            onClick={onNavigateToQuizzes}
            className="bg-java-orange hover:bg-java-red text-white font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer"
          >
            Powrót do quizów
          </button>
        </div>
      </div>
    );
  }
);

QuizNotFoundState.displayName = 'QuizNotFoundState';
