import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../utils/api';
import { useErrorHandler } from '../../../hooks/useErrorHandler.hook';

export interface StatisticsDto {
  postsCount: number;
  quizzesCount: number;
}

export const useStatistics = () => {
  const [statistics, setStatistics] = useState<StatisticsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useErrorHandler();

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      clearError();

      const response = await fetch(`${API_BASE_URL}/statistics`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: StatisticsDto = await response.json();
      setStatistics(data);
    } catch (err) {
      handleError(err, 'FETCH_STATISTICS_ERROR');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchStatistics();
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return {
    statistics,
    loading,
    error: error?.message || null,
    hasError: !!error,
    refetch,
    clearError,
  };
};
