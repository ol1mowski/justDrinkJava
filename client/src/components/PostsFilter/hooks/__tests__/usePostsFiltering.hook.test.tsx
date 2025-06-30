import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePostsFiltering } from '../usePostsFiltering.hook';
import type { PostDTO, FilterOptions, SortOption } from '../../types';

describe('usePostsFiltering', () => {
  const mockPosts: PostDTO[] = [
    {
      id: 1,
      user: { id: 1, username: 'john_doe' },
      category: { id: 1, name: 'Programming' },
      title: 'React Best Practices',
      description: 'Learn React best practices for better code',
      createdAt: '2023-01-01T00:00:00Z',
      readTime: 10,
    },
    {
      id: 2,
      user: { id: 2, username: 'jane_smith' },
      category: { id: 2, name: 'Design' },
      title: 'UI Design Principles',
      description: 'Essential UI design principles for developers',
      createdAt: '2023-01-02T00:00:00Z',
      readTime: 5,
    },
    {
      id: 3,
      user: { id: 3, username: 'bob_wilson' },
      category: { id: 1, name: 'Programming' },
      title: 'JavaScript Tips',
      description: 'Advanced JavaScript tips and tricks',
      createdAt: '2023-01-03T00:00:00Z',
      readTime: 8,
    },
  ];

  it('should return all posts when no filters are applied', () => {
    const filters: FilterOptions = { searchQuery: '', category: undefined };
    const sortBy: SortOption = 'newest';

    const { result } = renderHook(() =>
      usePostsFiltering({ posts: mockPosts, filters, sortBy })
    );

    expect(result.current.filteredPosts).toHaveLength(3);
    expect(result.current.filteredPosts[0].id).toBe(3);
    expect(result.current.filteredPosts[1].id).toBe(2);
    expect(result.current.filteredPosts[2].id).toBe(1);
  });

  it('should filter posts by search query in title', () => {
    const filters: FilterOptions = {
      searchQuery: 'React',
      category: undefined,
    };
    const sortBy: SortOption = 'newest';

    const { result } = renderHook(() =>
      usePostsFiltering({ posts: mockPosts, filters, sortBy })
    );

    expect(result.current.filteredPosts).toHaveLength(1);
    expect(result.current.filteredPosts[0].title).toBe('React Best Practices');
  });

  it('should filter posts by search query in description', () => {
    const filters: FilterOptions = {
      searchQuery: 'principles',
      category: undefined,
    };
    const sortBy: SortOption = 'newest';

    const { result } = renderHook(() =>
      usePostsFiltering({ posts: mockPosts, filters, sortBy })
    );

    expect(result.current.filteredPosts).toHaveLength(1);
    expect(result.current.filteredPosts[0].title).toBe('UI Design Principles');
  });

  it('should filter posts by search query in username', () => {
    const filters: FilterOptions = { searchQuery: 'john', category: undefined };
    const sortBy: SortOption = 'newest';

    const { result } = renderHook(() =>
      usePostsFiltering({ posts: mockPosts, filters, sortBy })
    );

    expect(result.current.filteredPosts).toHaveLength(1);
    expect(result.current.filteredPosts[0].user.username).toBe('john_doe');
  });

  it('should filter posts by search query in category name', () => {
    const filters: FilterOptions = {
      searchQuery: 'programming',
      category: undefined,
    };
    const sortBy: SortOption = 'newest';

    const { result } = renderHook(() =>
      usePostsFiltering({ posts: mockPosts, filters, sortBy })
    );

    expect(result.current.filteredPosts).toHaveLength(2);
    expect(
      result.current.filteredPosts.every(
        post => post.category.name === 'Programming'
      )
    ).toBe(true);
  });

  it('should filter posts by category', () => {
    const filters: FilterOptions = { searchQuery: '', category: 'Programming' };
    const sortBy: SortOption = 'newest';

    const { result } = renderHook(() =>
      usePostsFiltering({ posts: mockPosts, filters, sortBy })
    );

    expect(result.current.filteredPosts).toHaveLength(2);
    expect(
      result.current.filteredPosts.every(
        post => post.category.name === 'Programming'
      )
    ).toBe(true);
  });

  it('should combine search query and category filters', () => {
    const filters: FilterOptions = {
      searchQuery: 'best',
      category: 'Programming',
    };
    const sortBy: SortOption = 'newest';

    const { result } = renderHook(() =>
      usePostsFiltering({ posts: mockPosts, filters, sortBy })
    );

    expect(result.current.filteredPosts).toHaveLength(1);
    expect(result.current.filteredPosts[0].title).toBe('React Best Practices');
  });

  it('should sort posts by newest first', () => {
    const filters: FilterOptions = { searchQuery: '', category: undefined };
    const sortBy: SortOption = 'newest';

    const { result } = renderHook(() =>
      usePostsFiltering({ posts: mockPosts, filters, sortBy })
    );

    expect(result.current.filteredPosts[0].id).toBe(3);
    expect(result.current.filteredPosts[1].id).toBe(2);
    expect(result.current.filteredPosts[2].id).toBe(1);
  });

  it('should sort posts by oldest first', () => {
    const filters: FilterOptions = { searchQuery: '', category: undefined };
    const sortBy: SortOption = 'oldest';

    const { result } = renderHook(() =>
      usePostsFiltering({ posts: mockPosts, filters, sortBy })
    );

    expect(result.current.filteredPosts[0].id).toBe(1);
    expect(result.current.filteredPosts[1].id).toBe(2);
    expect(result.current.filteredPosts[2].id).toBe(3);
  });

  it('should sort posts by read time', () => {
    const filters: FilterOptions = { searchQuery: '', category: undefined };
    const sortBy: SortOption = 'readTime';

    const { result } = renderHook(() =>
      usePostsFiltering({ posts: mockPosts, filters, sortBy })
    );

    expect(result.current.filteredPosts[0].readTime).toBe(5);
    expect(result.current.filteredPosts[1].readTime).toBe(8);
    expect(result.current.filteredPosts[2].readTime).toBe(10);
  });

  it('should sort posts by title alphabetically', () => {
    const filters: FilterOptions = { searchQuery: '', category: undefined };
    const sortBy: SortOption = 'title';

    const { result } = renderHook(() =>
      usePostsFiltering({ posts: mockPosts, filters, sortBy })
    );

    expect(result.current.filteredPosts[0].title).toBe('JavaScript Tips');
    expect(result.current.filteredPosts[1].title).toBe('React Best Practices');
    expect(result.current.filteredPosts[2].title).toBe('UI Design Principles');
  });

  it('should handle case-insensitive search', () => {
    const filters: FilterOptions = {
      searchQuery: 'REACT',
      category: undefined,
    };
    const sortBy: SortOption = 'newest';

    const { result } = renderHook(() =>
      usePostsFiltering({ posts: mockPosts, filters, sortBy })
    );

    expect(result.current.filteredPosts).toHaveLength(1);
    expect(result.current.filteredPosts[0].title).toBe('React Best Practices');
  });

  it('should return empty array when no posts match filters', () => {
    const filters: FilterOptions = {
      searchQuery: 'nonexistent',
      category: undefined,
    };
    const sortBy: SortOption = 'newest';

    const { result } = renderHook(() =>
      usePostsFiltering({ posts: mockPosts, filters, sortBy })
    );

    expect(result.current.filteredPosts).toHaveLength(0);
  });

  it('should handle empty posts array', () => {
    const filters: FilterOptions = { searchQuery: '', category: undefined };
    const sortBy: SortOption = 'newest';

    const { result } = renderHook(() =>
      usePostsFiltering({ posts: [], filters, sortBy })
    );

    expect(result.current.filteredPosts).toHaveLength(0);
  });

  it('should handle posts with same read time', () => {
    const postsWithSameReadTime: PostDTO[] = [
      {
        id: 1,
        user: { id: 1, username: 'user1' },
        category: { id: 1, name: 'Programming' },
        title: 'Post A',
        description: 'Description A',
        createdAt: '2023-01-01T00:00:00Z',
        readTime: 5,
      },
      {
        id: 2,
        user: { id: 2, username: 'user2' },
        category: { id: 2, name: 'Design' },
        title: 'Post B',
        description: 'Description B',
        createdAt: '2023-01-02T00:00:00Z',
        readTime: 5,
      },
    ];

    const filters: FilterOptions = { searchQuery: '', category: undefined };
    const sortBy: SortOption = 'readTime';

    const { result } = renderHook(() =>
      usePostsFiltering({ posts: postsWithSameReadTime, filters, sortBy })
    );

    expect(result.current.filteredPosts).toHaveLength(2);
    expect(result.current.filteredPosts[0].readTime).toBe(5);
    expect(result.current.filteredPosts[1].readTime).toBe(5);
  });
});
