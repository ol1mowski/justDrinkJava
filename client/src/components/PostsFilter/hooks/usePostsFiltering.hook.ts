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
          post.user.username.toLowerCase().includes(query) ||
          post.category.name.toLowerCase().includes(query)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (post) => post.category.name === filters.category
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "readTime":
          return a.readTime - b.readTime;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, filters, sortBy]);

  return { filteredPosts };
};
