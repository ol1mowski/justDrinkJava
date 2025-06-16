import { memo } from "react";
import { AcademicCapIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { useQuizzes } from "./hooks/useQuizzes.hook";
import { useAuthStatus } from "../../hooks/useAuthStatus.hook";
import { QuizCard } from "./components";

export const QuizzesPage = memo(() => {
  const { quizzes, loading, error } = useQuizzes();
  const { isAuthenticated, user } = useAuthStatus();

  const handleStartQuiz = (quizId: number) => {
    console.log('Starting quiz:', quizId);
    // TODO: Implementacja rozpoczęcia quizu
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16 lg:py-24 bg-java-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-java-orange mx-auto"></div>
            <p className="mt-4 text-gray-600">Ładowanie quizów...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16 lg:py-24 bg-java-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-500 text-lg mb-4">❌ {error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-java-orange hover:bg-java-orange/90 text-white px-4 py-2 rounded-lg"
            >
              Spróbuj ponownie
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 lg:py-24 bg-java-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-java-orange/10 rounded-lg">
              <AcademicCapIcon className="w-6 h-6 text-java-orange" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-java-gray">
              Quizy Java
            </h1>
            <TrophyIcon className="w-6 h-6 text-java-orange" />
          </div>
          <p className="text-lg text-java-blue/90 max-w-2xl mx-auto">
            Sprawdź swoją wiedzę z programowania w Java. Rozwiązuj quizy na
            różnych poziomach trudności i rywalizuj z innymi developerami!
          </p>
          {isAuthenticated && user && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg inline-block">
              <p className="text-sm text-green-700">
                👋 Witaj <strong>{user.username}</strong>! Masz dostęp do wszystkich quizów
              </p>
            </div>
          )}
        </div>

        {quizzes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🧠</div>
            <p className="text-lg text-java-blue/90">
              Brak dostępnych quizów
            </p>
            <p className="text-sm text-java-gray/70 mt-2">
              Quizy będą wkrótce dostępne!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz, index) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                isBlocked={!isAuthenticated && index > 0}
                onStartQuiz={handleStartQuiz}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

QuizzesPage.displayName = "QuizzesPage";
