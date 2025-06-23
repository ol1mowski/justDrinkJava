import { useState, useCallback } from 'react';
import { rankingApi } from '../api/ranking.api';
import type { UserRankingDto, UpdateScoreRequest } from '../api/ranking.api';
import { useAuth } from './auth/useAuth.hook';

interface UseRankingReturn {
  userRanking: UserRankingDto | null;
  topRankings: UserRankingDto[];
  loading: boolean;
  error: string | null;
  updateUserScore: (totalScore: number) => Promise<UserRankingDto | null>;
  getUserRanking: (userId?: number) => Promise<void>;
  getTopRankings: (limit?: number) => Promise<void>;
  clearError: () => void;
  hasRanking: boolean;
}

export const useRanking = (): UseRankingReturn => {
  const { user } = useAuth();
  const [userRanking, setUserRanking] = useState<UserRankingDto | null>(null);
  const [topRankings, setTopRankings] = useState<UserRankingDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const updateUserScore = useCallback(
    async (pointsToAdd: number): Promise<UserRankingDto | null> => {
      if (!user?.id) {
        setError('Musisz być zalogowany aby aktualizować ranking');
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const currentRanking = await rankingApi.getUserRanking(
          typeof user.id === 'string' ? parseInt(user.id, 10) : user.id
        );

        const currentScore = currentRanking?.totalScore || 0;
        const newTotalScore = currentScore + pointsToAdd;

        const request: UpdateScoreRequest = {
          userId: typeof user.id === 'string' ? parseInt(user.id, 10) : user.id,
          totalScore: newTotalScore,
        };

        const updatedRanking = await rankingApi.updateUserScore(request);
        setUserRanking(updatedRanking);

        console.log(
          `Dodano ${pointsToAdd} punktów. Nowy wynik: ${newTotalScore}`
        );
        return updatedRanking;
      } catch (err: any) {
        const errorMessage =
          err.message || 'Nie udało się zaktualizować rankingu';
        setError(errorMessage);
        console.error('Błąd aktualizacji rankingu:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  const getUserRanking = useCallback(
    async (userId?: number): Promise<void> => {
      const targetUserId = userId || user?.id;
      if (!targetUserId) {
        setError('Nie można pobrać rankingu - brak ID użytkownika');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const userId =
          typeof targetUserId === 'string'
            ? parseInt(targetUserId, 10)
            : targetUserId;
        const ranking = await rankingApi.getUserRanking(userId);
        setUserRanking(ranking);
      } catch (err: any) {
        const errorMessage =
          err.message || 'Nie udało się pobrać rankingu użytkownika';
        setError(errorMessage);
        console.error('Błąd pobierania rankingu:', err);
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  const getTopRankings = useCallback(
    async (limit: number = 10): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const rankings = await rankingApi.getTopRankings(limit);
        setTopRankings(rankings);
      } catch (err: any) {
        const errorMessage = err.message || 'Nie udało się pobrać rankingu';
        setError(errorMessage);
        console.error('Błąd pobierania top rankingu:', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const hasRanking = userRanking !== null;

  return {
    userRanking,
    topRankings,
    loading,
    error,
    updateUserScore,
    getUserRanking,
    getTopRankings,
    clearError,
    hasRanking,
  };
};
