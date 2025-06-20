import { memo, useEffect, useState } from "react";
import {
  TrophyIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useRanking } from "../../../hooks/useRanking.hook";
import { useAuth } from "../../../hooks/auth/useAuth.hook";

interface QuizResultsProps {
  quiz: {
    id: number;
    title: string;
    description: string;
  };
  userAnswers: Record<number, string[]>;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  onRestart: () => void;
}

export const QuizResults = memo<QuizResultsProps>(
  ({ quiz, score, totalQuestions, correctAnswers, timeSpent, onRestart }) => {
    const { isAuthenticated } = useAuth()
    const { updateUserScore, userRanking } = useRanking()
    const [rankingUpdated, setRankingUpdated] = useState(false)
    const [showRankingUpdate, setShowRankingUpdate] = useState(false)
    const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const getScoreColor = (score: number) => {
      if (score >= 80) return "text-green-600";
      if (score >= 60) return "text-yellow-600";
      return "text-red-600";
    };

    const getScoreMessage = (score: number) => {
      if (score >= 90) return "Doskonały wynik! 🏆";
      if (score >= 80) return "Bardzo dobry wynik! 🎉";
      if (score >= 70) return "Dobry wynik! 👍";
      if (score >= 60) return "Wynik zadowalający 📚";
      return "Warto jeszcze poćwiczyć 💪";
    };

    const getStars = (score: number) => {
      if (score >= 90) return 5;
      if (score >= 80) return 4;
      if (score >= 70) return 3;
      if (score >= 60) return 2;
      return 1;
    };

    const stars = getStars(score);

    useEffect(() => {
      const updateRanking = async () => {
        if (isAuthenticated && !rankingUpdated) {
          try {
            const earnedPoints = Math.floor((score / 100) * correctAnswers * 5) // 5 points per correct answer, scaled by score
            const updatedRanking = await updateUserScore(earnedPoints)
            
            if (updatedRanking) {
              setRankingUpdated(true)
              setShowRankingUpdate(true)
              
              setTimeout(() => {
                setShowRankingUpdate(false)
              }, 5000)
            }
          } catch (error) {
            console.error('Błąd aktualizacji rankingu:', error)
          }
        }
      }

      updateRanking()
    }, [isAuthenticated, score, correctAnswers, rankingUpdated, updateUserScore])

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {showRankingUpdate && userRanking && (
            <div className="mb-8 mx-auto max-w-2xl">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 rounded-full p-3">
                    <TrophyIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-green-800 mb-1">
                      🎉 Ranking zaktualizowany!
                    </h3>
                    <p className="text-green-700">
                      Twoja pozycja: <span className="font-bold">#{userRanking.ranking}</span>
                      {' • '}
                      Łącznie punktów: <span className="font-bold">{userRanking.totalScore}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-java-orange to-java-red rounded-full mb-6 shadow-lg">
              <TrophyIcon className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Quiz Ukończony!
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              {quiz.title}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-8">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6 shadow-md">
                  <CheckCircleIcon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {correctAnswers}
                </div>
                <div className="text-green-700 font-medium text-lg">
                  Poprawne odpowiedzi
                </div>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border-2 border-red-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-6 shadow-md">
                  <XCircleIcon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-red-600 mb-2">
                  {totalQuestions - correctAnswers}
                </div>
                <div className="text-red-700 font-medium text-lg">
                  Błędne odpowiedzi
                </div>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6 shadow-md">
                  <ClockIcon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {formatTime(timeSpent)}
                </div>
                <div className="text-blue-700 font-medium text-lg">
                  Czas rozwiązywania
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={onRestart}
              className="inline-flex items-center justify-center space-x-3 px-10 py-4 bg-gradient-to-r from-java-orange to-java-red 
                     hover:from-java-red hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-200 
                     cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105
                     focus:outline-none focus:ring-4 focus:ring-java-orange/50"
            >
              <ArrowPathIcon className="w-6 h-6" />
              <span className="text-lg">Spróbuj ponownie</span>
            </button>

            <button
              onClick={() => (window.location.href = "/quizzes")}
              className="inline-flex items-center justify-center space-x-3 px-10 py-4 bg-white hover:bg-gray-50 
                     text-gray-700 font-semibold rounded-xl transition-all duration-200 cursor-pointer
                     shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-gray-200 hover:border-gray-300
                     focus:outline-none focus:ring-4 focus:ring-gray-300/50"
            >
              <span className="text-lg">Powrót do quizów</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

QuizResults.displayName = "QuizResults";
