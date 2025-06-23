import { memo } from 'react';
import { QuizzesHeader } from './components/QuizzesHeader.component';
import { QuizzesGrid } from './components/QuizzesGrid.component';
import { QuizzesLoading } from './components/QuizzesLoading.component';
import { QuizzesError } from './components/QuizzesError.component';
import { useQuizzes } from './hooks/useQuizzes.hook';
import { useAuthStatus } from '../../hooks/useAuthStatus.hook';
import { ErrorBoundaryWrapper } from '../ui';

export const QuizzesPage = memo(() => {
  const { quizzes, loading, error } = useQuizzes();
  const { isAuthenticated, user } = useAuthStatus();

  const handleStartQuiz = (quizId: number) => {
    window.location.href = `/quizzes/${quizId}`;
  };

  if (loading) {
    return <QuizzesLoading />;
  }

  if (error) {
    return <QuizzesError error={error} />;
  }

  return (
    <ErrorBoundaryWrapper
      title="Błąd strony quizów"
      message="Wystąpił problem podczas ładowania quizów"
    >
      <div className="min-h-screen py-16 lg:py-24 bg-java-white dark:bg-java-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuizzesHeader isAuthenticated={isAuthenticated} user={user} />

          <QuizzesGrid
            quizzes={quizzes}
            isAuthenticated={isAuthenticated}
            onStartQuiz={handleStartQuiz}
          />
        </div>
      </div>
    </ErrorBoundaryWrapper>
  );
});

QuizzesPage.displayName = 'QuizzesPage';
