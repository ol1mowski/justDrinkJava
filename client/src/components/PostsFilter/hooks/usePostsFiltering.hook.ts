import { useMemo } from "react";
import type { PostDTO, FilterOptions, SortOption } from "../types";

interface UsePostsFilteringOptions {
  posts: PostDTO[];
  filters: FilterOptions;
  sortBy: SortOption;
}

export const usePostsFiltering = ({
  posts,
  filters,
  sortBy,
}: UsePostsFilteringOptions) => {
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.category.name.toLowerCase().includes(query)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (post) => post.category.name === filters.category
      );
    }

    if (filters.hashtags.length > 0) {
      filtered = filtered.filter((post) =>
        post.hashtags?.some(
          (hashtag: { id: number; name: string; postCount: number }) =>
            filters.hashtags.includes(hashtag.name)
        )
      );
    }

    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "readTime":
        filtered.sort((a, b) => a.readTime - b.readTime);
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [posts, filters, sortBy]);

  return { filteredPosts };
};
