import { memo } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { getScoreColor, getScoreMessage, getStars } from '../utils/quizResults.utils';

interface ScoreDisplayProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

export const ScoreDisplay = memo<ScoreDisplayProps>(
  ({ score, correctAnswers, totalQuestions }) => {
    const stars = getStars(score);

    return (
      <div className="text-center mb-10">
        <div className={`text-7xl font-bold mb-6 ${getScoreColor(score)} drop-shadow-sm`}>
          {score}%
        </div>

        <div className="flex justify-center space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`w-10 h-10 ${
                star <= stars
                  ? "text-yellow-400 drop-shadow-sm"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <p className="text-2xl font-semibold text-gray-800 mb-3">
          {getScoreMessage(score)}
        </p>

        <p className="text-gray-600 text-lg">
          Odpowiedziałeś poprawnie na {correctAnswers} z {totalQuestions} pytań
        </p>
      </div>
    );
  }
);

ScoreDisplay.displayName = 'ScoreDisplay'; 