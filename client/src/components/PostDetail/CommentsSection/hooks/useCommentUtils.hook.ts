import { useCallback } from 'react';

export interface UseCommentUtilsResult {
  formatDate: (dateString: string) => string;
  getUserInitial: (username: string) => string;
}

export const useCommentUtils = (): UseCommentUtilsResult => {
  const formatDate = useCallback((dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  const getUserInitial = useCallback((username: string): string => {
    return username?.charAt(0).toUpperCase() || 'U';
  }, []);

  return {
    formatDate,
    getUserInitial,
  };
};
