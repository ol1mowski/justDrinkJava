import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCategories } from '../useCategories.hook';
import type { PostDTO } from '../../types';

describe('useCategories', () => {
  it('should return empty categories for empty posts array', () => {
    const posts: PostDTO[] = [];
    const { result } = renderHook(() => useCategories(posts));

    expect(result.current.categories).toEqual([]);
  });

  it('should extract unique categories from posts', () => {
    const posts: PostDTO[] = [
      {
        id: 1,
        user: { id: 1, username: 'user1' },
        category: { id: 1, name: 'Programming' },
        title: 'Post 1',
        description: 'Description 1',
        createdAt: '2023-01-01T00:00:00Z',
        readTime: 5,
      },
      {
        id: 2,
        user: { id: 2, username: 'user2' },
        category: { id: 2, name: 'Design' },
        title: 'Post 2',
        description: 'Description 2',
        createdAt: '2023-01-02T00:00:00Z',
        readTime: 3,
      },
      {
        id: 3,
        user: { id: 3, username: 'user3' },
        category: { id: 1, name: 'Programming' },
        title: 'Post 3',
        description: 'Description 3',
        createdAt: '2023-01-03T00:00:00Z',
        readTime: 7,
      },
    ];

    const { result } = renderHook(() => useCategories(posts));

    expect(result.current.categories).toHaveLength(2);
    expect(result.current.categories).toEqual([
      { id: 1, name: 'Programming' },
      { id: 2, name: 'Design' },
    ]);
  });

  it('should handle posts without categories', () => {
    const posts: PostDTO[] = [
      {
        id: 1,
        user: { id: 1, username: 'user1' },
        category: { id: 1, name: 'Programming' },
        title: 'Post 1',
        description: 'Description 1',
        createdAt: '2023-01-01T00:00:00Z',
        readTime: 5,
      },
      {
        id: 2,
        user: { id: 2, username: 'user2' },
        category: undefined as any,
        title: 'Post 2',
        description: 'Description 2',
        createdAt: '2023-01-02T00:00:00Z',
        readTime: 3,
      },
    ];

    const { result } = renderHook(() => useCategories(posts));

    expect(result.current.categories).toHaveLength(1);
    expect(result.current.categories).toEqual([{ id: 1, name: 'Programming' }]);
  });

  it('should handle posts with null categories', () => {
    const posts: PostDTO[] = [
      {
        id: 1,
        user: { id: 1, username: 'user1' },
        category: null as any,
        title: 'Post 1',
        description: 'Description 1',
        createdAt: '2023-01-01T00:00:00Z',
        readTime: 5,
      },
    ];

    const { result } = renderHook(() => useCategories(posts));

    expect(result.current.categories).toEqual([]);
  });

  it('should maintain category order based on first occurrence', () => {
    const posts: PostDTO[] = [
      {
        id: 1,
        user: { id: 1, username: 'user1' },
        category: { id: 2, name: 'Design' },
        title: 'Post 1',
        description: 'Description 1',
        createdAt: '2023-01-01T00:00:00Z',
        readTime: 5,
      },
      {
        id: 2,
        user: { id: 2, username: 'user2' },
        category: { id: 1, name: 'Programming' },
        title: 'Post 2',
        description: 'Description 2',
        createdAt: '2023-01-02T00:00:00Z',
        readTime: 3,
      },
      {
        id: 3,
        user: { id: 3, username: 'user3' },
        category: { id: 2, name: 'Design' },
        title: 'Post 3',
        description: 'Description 3',
        createdAt: '2023-01-03T00:00:00Z',
        readTime: 7,
      },
    ];

    const { result } = renderHook(() => useCategories(posts));

    expect(result.current.categories).toEqual([
      { id: 2, name: 'Design' },
      { id: 1, name: 'Programming' },
    ]);
  });

  it('should handle single post with category', () => {
    const posts: PostDTO[] = [
      {
        id: 1,
        user: { id: 1, username: 'user1' },
        category: { id: 1, name: 'Programming' },
        title: 'Post 1',
        description: 'Description 1',
        createdAt: '2023-01-01T00:00:00Z',
        readTime: 5,
      },
    ];

    const { result } = renderHook(() => useCategories(posts));

    expect(result.current.categories).toHaveLength(1);
    expect(result.current.categories).toEqual([{ id: 1, name: 'Programming' }]);
  });

  it('should handle large number of posts efficiently', () => {
    const posts: PostDTO[] = Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      user: { id: index + 1, username: `user${index + 1}` },
      category: { id: (index % 5) + 1, name: `Category ${(index % 5) + 1}` },
      title: `Post ${index + 1}`,
      description: `Description ${index + 1}`,
      createdAt: '2023-01-01T00:00:00Z',
      readTime: 5,
    }));

    const { result } = renderHook(() => useCategories(posts));

    expect(result.current.categories).toHaveLength(5);
    expect(result.current.categories).toEqual([
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' },
      { id: 4, name: 'Category 4' },
      { id: 5, name: 'Category 5' },
    ]);
  });
});
