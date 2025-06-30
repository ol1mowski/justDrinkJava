import {
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { queryKeys } from '../../../lib/queryKeys';
import type { PostDTO } from '../../PostsFilter/types';
import { API_BASE_URL } from '../../../utils/api';

export interface SearchPostsParams {
  query?: string;
  category?: string;
  hashtag?: string;
  pageSize?: number;
}

export interface SearchPostsResponse {
  posts: PostDTO[];
  totalCount: number;
  hasMore: boolean;
  nextPage: number | null;
}

export const useSearchPosts = (params: SearchPostsParams) => {
  return useInfiniteQuery({
    queryKey: queryKeys.posts.search(JSON.stringify(params)),
    queryFn: async ({ pageParam = 1 }): Promise<SearchPostsResponse> => {
      const searchParams = new URLSearchParams({
        page: pageParam.toString(),
        limit: (params.pageSize || 10).toString(),
        ...(params.query && { query: params.query }),
        ...(params.category && { category: params.category }),
        ...(params.hashtag && { hashtag: params.hashtag }),
      });

      const response = await fetch(
        `${API_BASE_URL}/posts/search?${searchParams}`
      );
      if (!response.ok) {
        throw new Error(`Failed to search posts: ${response.status}`);
      }

      const data = await response.json();

      return {
        posts: data.posts || [],
        totalCount: data.totalCount || 0,
        hasMore: data.hasMore || false,
        nextPage: data.hasMore ? pageParam + 1 : null,
      };
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextPage,
    enabled: !!(params.query || params.category || params.hashtag),
    staleTime: 30 * 1000,
  });
};

export const useSearchPostsSuspense = (params: SearchPostsParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: queryKeys.posts.search(JSON.stringify(params)),
    queryFn: async ({ pageParam = 1 }): Promise<SearchPostsResponse> => {
      const searchParams = new URLSearchParams({
        page: pageParam.toString(),
        limit: (params.pageSize || 10).toString(),
        ...(params.query && { query: params.query }),
        ...(params.category && { category: params.category }),
        ...(params.hashtag && { hashtag: params.hashtag }),
      });

      const response = await fetch(
        `${API_BASE_URL}/posts/search?${searchParams}`
      );
      if (!response.ok) {
        throw new Error(`Failed to search posts: ${response.status}`);
      }

      const data = await response.json();

      return {
        posts: data.posts || [],
        totalCount: data.totalCount || 0,
        hasMore: data.hasMore || false,
        nextPage: data.hasMore ? pageParam + 1 : null,
      };
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextPage,
  });
};
