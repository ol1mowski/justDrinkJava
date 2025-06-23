import { useState, useEffect } from 'react';
import { API_BASE_URL, type PostData } from '../../../utils/api';
import { useErrorHandler } from '../../../hooks/useErrorHandler.hook';

export const useLatestPosts = (limit: number = 9) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useErrorHandler();

  const fetchLatestPosts = async () => {
    try {
      setLoading(true);
      clearError();

      const response = await fetch(`${API_BASE_URL}/posts?limit=${limit}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: PostData[] = await response.json();
      setPosts(data);
    } catch (err) {
      handleError(err, 'FETCH_LATEST_POSTS_ERROR');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchLatestPosts();
  };

  useEffect(() => {
    fetchLatestPosts();
  }, [limit]);

  return {
    posts,
    loading,
    error: error?.message || null,
    hasError: !!error,
    refetch,
    clearError,
  };
};
