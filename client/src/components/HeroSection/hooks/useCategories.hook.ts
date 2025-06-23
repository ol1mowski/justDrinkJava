import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../utils/api';
import { useErrorHandler } from '../../../hooks/useErrorHandler.hook';

export interface CategoryDto {
  id: number;
  name: string;
}

export interface CategoryTag {
  id: string;
  name: string;
  count: number;
  color: 'orange' | 'red' | 'blue';
  trending?: boolean;
}

const categoryToTag = (
  category: CategoryDto,
  index: number,
  postCount: number = 0
): CategoryTag => {
  const colors: CategoryTag['color'][] = ['orange', 'red', 'blue'];
  const randomColor = colors[index % colors.length];

  const trending = postCount > 5;

  return {
    id: category.id.toString(),
    name: category.name,
    count: postCount,
    color: randomColor,
    trending,
  };
};

export const useCategories = (limit: number = 10) => {
  const [tags, setTags] = useState<CategoryTag[]>([]);
  const [loading, setLoading] = useState(true);
  const { error, handleError, clearError } = useErrorHandler();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      clearError();

      const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);
      if (!categoriesResponse.ok) {
        throw new Error(
          `HTTP ${categoriesResponse.status}: ${categoriesResponse.statusText}`
        );
      }
      const categories: CategoryDto[] = await categoriesResponse.json();

      const postsResponse = await fetch(`${API_BASE_URL}/posts?limit=100`);
      if (!postsResponse.ok) {
        throw new Error(
          `HTTP ${postsResponse.status}: ${postsResponse.statusText}`
        );
      }
      const posts: any[] = await postsResponse.json();

      const categoryPostCounts = categories.map(category => {
        const postCount = posts.filter(
          post => post.category?.id === category.id
        ).length;
        return { ...category, postCount };
      });

      const sortedCategories = categoryPostCounts
        .sort((a, b) => b.postCount - a.postCount)
        .slice(0, limit);

      const convertedTags = sortedCategories.map((category, index) =>
        categoryToTag(category, index, category.postCount)
      );

      setTags(convertedTags);
    } catch (err) {
      handleError(err, 'FETCH_CATEGORIES_ERROR');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, [limit]);

  return {
    tags,
    loading,
    error: error?.message || null,
    hasError: !!error,
    refetch,
    clearError,
  };
};
