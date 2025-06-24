import { memo, useEffect } from 'react';
import { TrophyIcon, StarIcon } from '@heroicons/react/24/solid';
import { UserIcon } from '@heroicons/react/24/outline';
import { useRanking } from './hooks/useRanking.hook';
import { useAuth } from '../../hooks/auth/useAuth.hook';

interface RankingSectionProps {
  showUserRanking?: boolean;
  topLimit?: number;
  className?: string;
}

export const RankingSection = memo<RankingSectionProps>(
  ({ showUserRanking = true, topLimit = 10, className = '' }) => {
    const { isAuthenticated, user } = useAuth();
    const {
      userRanking,
      topRankings,
      loading,
      error,
      getUserRanking,
      getTopRankings,
    } = useRanking();

    useEffect(() => {
      getTopRankings(topLimit);
      if (isAuthenticated && showUserRanking) {
        getUserRanking();
      }
    }, [
      isAuthenticated,
      showUserRanking,
      topLimit,
      getUserRanking,
      getTopRankings,
    ]);

    const getRankingBadge = (ranking: number) => {
      if (ranking === 1) return '🥇';
      if (ranking === 2) return '🥈';
      if (ranking === 3) return '🥉';
      return `#${ranking}`;
    };

    const getRankingColor = (ranking: number) => {
      if (ranking === 1)
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      if (ranking === 2) return 'text-gray-600 bg-gray-50 border-gray-200';
      if (ranking === 3) return 'text-amber-600 bg-amber-50 border-amber-200';
      return 'text-blue-600 bg-blue-50 border-blue-200';
    };

    if (loading) {
      return (
        <div className={`bg-white rounded-2xl shadow-lg p-8 ${className}`}>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={`bg-white rounded-2xl shadow-lg p-8 ${className}`}>
          <div className="text-center text-red-600">
            <p className="text-lg font-medium mb-2">Błąd ładowania rankingu</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      );
    }

    return (
      <div className={`bg-white rounded-2xl shadow-lg p-8 ${className}`}>
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-gradient-to-r from-java-orange to-java-red rounded-full p-3">
            <TrophyIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Ranking Użytkowników
            </h2>
            <p className="text-gray-600">
              Najlepsi użytkownicy według punktów z quizów
            </p>
          </div>
        </div>

        {isAuthenticated && showUserRanking && userRanking && (
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <UserIcon className="w-5 h-5" />
              <span>Twój ranking</span>
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`px-4 py-2 rounded-full font-bold text-lg border-2 ${getRankingColor(userRanking.ranking)}`}
                >
                  {getRankingBadge(userRanking.ranking)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {userRanking.username}
                  </p>
                  <p className="text-sm text-gray-600">{userRanking.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-java-orange">
                  {userRanking.totalScore}
                </p>
                <p className="text-sm text-gray-600">punktów</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
            <StarIcon className="w-6 h-6 text-yellow-500" />
            <span>Top {topLimit} Użytkowników</span>
          </h3>

          {topRankings.length === 0 ? (
            <div className="text-center py-12">
              <TrophyIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Brak danych o rankingu</p>
              <p className="text-gray-400 text-sm">
                Bądź pierwszy i rozwiąż quiz!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {topRankings.map((ranking, index) => (
                <div
                  key={ranking.userId}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                    index < 3
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 ${getRankingColor(ranking.ranking)}`}
                    >
                      {getRankingBadge(ranking.ranking)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {ranking.username}
                        {ranking.userId === user?.id && (
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            To Ty!
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-600">{ranking.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-java-orange">
                      {ranking.totalScore}
                    </p>
                    <p className="text-sm text-gray-600">punktów</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!isAuthenticated && (
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
            <p className="text-center text-gray-700">
              <span className="font-semibold">Zaloguj się</span> aby zobaczyć
              swój ranking i zdobywać punkty!
            </p>
          </div>
        )}
      </div>
    );
  }
);

RankingSection.displayName = 'RankingSection';
