import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/queryKeys';
import { API_BASE_URL } from '../../../api';
import type { PostDTO } from '../types';

export const usePostsData = () => {
  return useQuery({
    queryKey: queryKeys.posts.list({}),
    queryFn: async (): Promise<PostDTO[]> => {
      const response = await fetch(`${API_BASE_URL}/posts?limit=50`);
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }
      return response.json();
    },
  });
};
