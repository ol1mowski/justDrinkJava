import { useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/queryKeys';
import { API_BASE_URL } from '../../../utils/api';
import { useFiltersState } from './useFiltersState.hook';
import { usePostsFiltering } from './usePostsFiltering.hook';
import { useCategories } from './useCategories.hook';
import type { PostDTO, UsePostsReturn } from '../types';
import { useCallback } from 'react';

export const usePostsSuspense = (): Omit<
  UsePostsReturn,
  'isLoading' | 'error'
> => {
  const { data: posts } = useSuspenseQuery({
    queryKey: queryKeys.posts.list({}),
    queryFn: async (): Promise<PostDTO[]> => {
      const response = await fetch(`${API_BASE_URL}/posts?limit=50`);
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }
      return response.json();
    },
  });

  const { sortBy, setSortBy, filters, setFilters } = useFiltersState();
  const { filteredPosts } = usePostsFiltering({ posts, filters, sortBy });
  const { categories } = useCategories(posts);

  const refreshPosts = useCallback(() => {
    // W przypadku suspense query nie ma refetch - dane są zawsze świeże
  }, []);

  return {
    posts,
    categories,
    sortBy,
    filters,
    filteredPosts,
    setSortBy,
    setFilters,
    refreshPosts,
  };
};
