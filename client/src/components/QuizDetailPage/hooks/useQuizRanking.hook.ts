import { useEffect, useState } from 'react';
import { useRanking } from '../../../hooks/useRanking.hook';
import { useAuth } from '../../../hooks/auth/useAuth.hook';

interface UseQuizRankingProps {
  score: number;
  correctAnswers: number;
}

export const useQuizRanking = ({
  score,
  correctAnswers,
}: UseQuizRankingProps) => {
  const { isAuthenticated } = useAuth();
  const { updateUserScore, userRanking } = useRanking();
  const [rankingUpdated, setRankingUpdated] = useState(false);
  const [showRankingUpdate, setShowRankingUpdate] = useState(false);

  useEffect(() => {
    const updateRanking = async () => {
      if (isAuthenticated && !rankingUpdated) {
        try {
          const earnedPoints = Math.floor((score / 100) * correctAnswers * 5); // 5 points per correct answer, scaled by score
          const updatedRanking = await updateUserScore(earnedPoints);

          if (updatedRanking) {
            setRankingUpdated(true);
            setShowRankingUpdate(true);

            setTimeout(() => {
              setShowRankingUpdate(false);
            }, 5000);
          }
        } catch (error) {
          console.error('Błąd aktualizacji rankingu:', error);
        }
      }
    };

    updateRanking();
  }, [isAuthenticated, score, correctAnswers, rankingUpdated, updateUserScore]);

  return {
    userRanking,
    showRankingUpdate,
  };
};
