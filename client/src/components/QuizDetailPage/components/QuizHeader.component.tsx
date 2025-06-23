import { memo } from 'react';
import {
  ClockIcon,
  TagIcon,
  FireIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';

interface QuizHeaderProps {
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeRemaining: number;
  onSubmit: () => void;
}

export const QuizHeader = memo<QuizHeaderProps>(
  ({ title, description, category, difficulty, timeRemaining, onSubmit }) => {
    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getDifficultyColor = (diff: string) => {
      switch (diff) {
        case 'easy':
          return 'text-green-600 bg-green-100';
        case 'medium':
          return 'text-yellow-600 bg-yellow-100';
        case 'hard':
          return 'text-red-600 bg-red-100';
        default:
          return 'text-gray-600 bg-gray-100';
      }
    };

    const getDifficultyIcon = (diff: string) => {
      switch (diff) {
        case 'easy':
          return <FireIcon className="w-4 h-4" />;
        case 'medium':
          return <FireIcon className="w-4 h-4" />;
        case 'hard':
          return <FireIcon className="w-4 h-4" />;
        default:
          return <FireIcon className="w-4 h-4" />;
      }
    };

    return (
      <div className="bg-white dark:bg-java-dark-surface rounded-xl shadow-lg border border-gray-200 dark:border-java-dark-border p-6 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <span
                className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}
              >
                {getDifficultyIcon(difficulty)}
                <span className="capitalize">{difficulty}</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium text-java-blue bg-java-blue/10">
                <TagIcon className="w-4 h-4" />
                <span>{category}</span>
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-java-gray dark:text-java-dark-text mb-2">
              {title}
            </h1>

            <p className="text-gray-600 dark:text-java-dark-text-secondary text-sm leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex items-center space-x-4 ml-6">
            <div className="text-center">
              <div className="flex items-center space-x-2 text-java-orange mb-1">
                <ClockIcon className="w-5 h-5" />
                <span className="text-xl font-bold">
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-java-dark-text-secondary">
                Pozostały czas
              </span>
            </div>

            <button
              onClick={onSubmit}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-java-orange hover:bg-java-red 
                     text-white font-medium text-sm rounded-lg transition-colors cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-java-orange focus:ring-offset-2"
            >
              <FlagIcon className="w-4 h-4" />
              <span>Zakończ Quiz</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

QuizHeader.displayName = 'QuizHeader';
