import { usePostsData } from './usePostsData.hook';
import { useFiltersState } from './useFiltersState.hook';
import { usePostsFiltering } from './usePostsFiltering.hook';
import { useCategories } from './useCategories.hook';
import type { UsePostsReturn } from '../types';

export const usePostsMain = (): UsePostsReturn => {
  const {
    data: posts = [],
    isLoading: postsLoading,
    error: postsError,
    refetch,
  } = usePostsData();
  const { categories } = useCategories(posts);

  const { sortBy, setSortBy, filters, setFilters } = useFiltersState();
  const { filteredPosts } = usePostsFiltering({ posts, filters, sortBy });

  const isLoading = postsLoading;
  const error = postsError?.message || null;

  return {
    posts,
    categories,
    isLoading,
    error,
    sortBy,
    filters,
    filteredPosts,
    setSortBy,
    setFilters,
    refreshPosts: refetch,
  };
};
