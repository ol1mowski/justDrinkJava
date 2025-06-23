import { useMemo } from 'react';
import type { PostDTO } from '../types';

interface Category {
  id: number;
  name: string;
}

export const useCategories = (posts: PostDTO[]) => {
  const categories = useMemo(() => {
    const uniqueCategories = posts.reduce((acc, post) => {
      if (
        post.category &&
        !acc.find((cat: Category) => cat.id === post.category.id)
      ) {
        acc.push(post.category);
      }
      return acc;
    }, [] as Category[]);

    return uniqueCategories;
  }, [posts]);

  return { categories };
};
