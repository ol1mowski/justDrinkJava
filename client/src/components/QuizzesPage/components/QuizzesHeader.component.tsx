import { memo } from 'react';
import { AcademicCapIcon, TrophyIcon } from '@heroicons/react/24/outline';

interface QuizzesHeaderProps {
  isAuthenticated: boolean;
  user?: { username: string } | null;
}

export const QuizzesHeader = memo<QuizzesHeaderProps>(
  ({ isAuthenticated, user }) => {
    return (
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 bg-java-orange/10 rounded-lg">
            <AcademicCapIcon className="w-6 h-6 text-java-orange" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-java-gray dark:text-java-dark-text">
            Quizy Java
          </h1>
          <TrophyIcon className="w-6 h-6 text-java-orange" />
        </div>
        <p className="text-lg text-java-blue/90 dark:text-java-dark-text-secondary max-w-2xl mx-auto">
          Sprawdź swoją wiedzę z programowania w Java. Rozwiązuj quizy na
          różnych poziomach trudności i rywalizuj z innymi developerami!
        </p>
        {isAuthenticated && user && (
          <div className="mt-4 p-3 bg-green/50border border-green-200  rounded-lg inline-block">
            <p className="text-sm text-green-700 dark:text-green-300">
              👋 Witaj <strong>{user.username}</strong>! Masz dostęp do
              wszystkich quizów
            </p>
          </div>
        )}
      </div>
    );
  }
);

QuizzesHeader.displayName = 'QuizzesHeader';
