import { useState, useCallback, useMemo, startTransition } from 'react';
import { apiService } from '../utils/api';
import type {
  PostData,
  SearchPostsRequest,
  SearchPostsResponse,
} from '../utils/api';

interface UseSearchPostsState {
  posts: PostData[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  total: number;
}

interface UseSearchPostsReturn extends UseSearchPostsState {
  searchPosts: (query: string) => void;
  loadMore: () => void;
  clearSearch: () => void;
}

export const useSearchPosts = (): UseSearchPostsReturn => {
  const [state, setState] = useState<UseSearchPostsState>({
    posts: [],
    isLoading: false,
    error: null,
    hasMore: false,
    total: 0,
  });

  const [currentQuery, setCurrentQuery] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

  const performSearch = useCallback(
    async (query: string, offset = 0, append = false) => {
      if (!query.trim()) {
        setState(prev => ({
          ...prev,
          posts: [],
          hasMore: false,
          total: 0,
          error: null,
        }));
        return;
      }

      const isInitialSearch = offset === 0 && !append;

      setState(prev => ({
        ...prev,
        isLoading: true,
        error: null,
        ...(isInitialSearch && { posts: [] }),
      }));

      try {
        const request: SearchPostsRequest = {
          query: query.trim(),
          limit: 10,
          offset,
        };

        const response: SearchPostsResponse =
          await apiService.searchPosts(request);

        startTransition(() => {
          setState(prev => ({
            ...prev,
            posts: append ? [...prev.posts, ...response.posts] : response.posts,
            hasMore: response.hasMore,
            total: response.total,
            isLoading: false,
            error: null,
          }));
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : 'Błąd podczas wyszukiwania postów',
        }));
      }
    },
    []
  );

  const searchPosts = useCallback(
    (query: string) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      setCurrentQuery(query);

      const timeout = setTimeout(() => {
        performSearch(query);
      }, 300);

      setDebounceTimeout(timeout);
    },
    [debounceTimeout, performSearch]
  );

  const loadMore = useCallback(() => {
    if (state.isLoading || !state.hasMore || !currentQuery) return;

    performSearch(currentQuery, state.posts.length, true);
  }, [
    state.isLoading,
    state.hasMore,
    state.posts.length,
    currentQuery,
    performSearch,
  ]);

  const clearSearch = useCallback(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
      setDebounceTimeout(null);
    }

    setCurrentQuery('');
    setState({
      posts: [],
      isLoading: false,
      error: null,
      hasMore: false,
      total: 0,
    });
  }, [debounceTimeout]);

  const cleanup = useCallback(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
  }, [debounceTimeout]);

  return useMemo(
    () => ({
      ...state,
      searchPosts,
      loadMore,
      clearSearch,
      cleanup,
    }),
    [state, searchPosts, loadMore, clearSearch, cleanup]
  );
};
