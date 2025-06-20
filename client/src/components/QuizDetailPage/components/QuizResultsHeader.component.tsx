import { memo } from 'react';
import { TrophyIcon } from '@heroicons/react/24/outline';

interface QuizResultsHeaderProps {
  quizTitle: string;
}

export const QuizResultsHeader = memo<QuizResultsHeaderProps>(({ quizTitle }) => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-java-orange to-java-red rounded-full mb-6 shadow-lg">
        <TrophyIcon className="w-10 h-10 text-white" />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Quiz Ukończony!
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        {quizTitle}
      </p>
    </div>
  );
});

QuizResultsHeader.displayName = 'QuizResultsHeader'; 