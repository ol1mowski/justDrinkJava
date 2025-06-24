import { useState, useCallback } from 'react';
import type { PostData } from '../utils/api';

interface UseSearchPostsReturn {
  posts: PostData[];
  isLoading: boolean;
  error: string | null;
  total: number;
  searchPosts: (query: string) => void;
  clearSearch: () => void;
}

export const useSearchPosts = (): UseSearchPostsReturn => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const searchPosts = useCallback(async (query: string) => {
    if (!query.trim()) {
      setPosts([]);
      setTotal(0);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Symulacja wyszukiwania - w rzeczywistości to byłoby API call
      const mockResults: PostData[] = [
        {
          id: 1,
          title: `Rezultat wyszukiwania dla "${query}"`,
          description: 'To jest przykładowy rezultat wyszukiwania...',
          user: {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
            createdAt: '2024-01-01',
          },
          createdAt: '2024-01-01T00:00:00Z',
          readTime: 5,
          readTimeFormatted: '5 min',
          likes: 0,
          isLikedByCurrentUser: false,
        },
        {
          id: 2,
          title: `Inny rezultat dla "${query}"`,
          description: 'To jest kolejny przykładowy rezultat...',
          user: {
            id: 2,
            username: 'author',
            email: 'author@example.com',
            createdAt: '2024-01-01',
          },
          createdAt: '2024-01-02T00:00:00Z',
          readTime: 3,
          readTimeFormatted: '3 min',
          likes: 0,
          isLikedByCurrentUser: false,
        },
      ];

      // Symulacja opóźnienia
      await new Promise(resolve => setTimeout(resolve, 300));

      setPosts(mockResults);
      setTotal(mockResults.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd wyszukiwania');
      setPosts([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setPosts([]);
    setTotal(0);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    posts,
    isLoading,
    error,
    total,
    searchPosts,
    clearSearch,
  };
};
