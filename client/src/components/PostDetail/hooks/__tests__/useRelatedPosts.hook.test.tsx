import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useRelatedPosts } from '../useRelatedPosts.hook';

// Mock API_BASE_URL - it's exported from ../../../../api/index.ts
vi.mock('../../../../api/index.ts', () => ({
  API_BASE_URL: 'http://localhost:3000/api',
}));

// Mock fetch globally
Object.defineProperty(global, 'fetch', {
  value: vi.fn(),
  writable: true,
});

const mockFetch = global.fetch as any;

describe('useRelatedPosts', () => {
  const mockPosts = [
    {
      id: 1,
      title: 'Test Post 1',
      content: 'Content 1',
      likes: 5,
      createdAt: '2023-01-01T00:00:00Z',
    },
    {
      id: 2,
      title: 'Test Post 2',
      content: 'Content 2',
      likes: 10,
      createdAt: '2023-01-02T00:00:00Z',
    },
    {
      id: 3,
      title: 'Test Post 3',
      content: 'Content 3',
      likes: 15,
      createdAt: '2023-01-03T00:00:00Z',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch related posts successfully', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    const { result } = renderHook(() => useRelatedPosts(2));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.posts).toEqual([]);
    expect(result.current.hasErrors).toBe(false);

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );
  });

  it('should filter out main post and limit to 2 posts', async () => {
    const manyPosts = [
      {
        id: 1,
        title: 'Post 1',
        description: 'Description 1',
        user: {
          id: 1,
          username: 'user1',
          email: 'user1@test.com',
          createdAt: '2023-01-01T00:00:00Z',
        },
        createdAt: '2023-01-01T00:00:00Z',
        readTime: 5,
        readTimeFormatted: '5 min',
        likes: 10,
        isLikedByCurrentUser: false,
      },
      {
        id: 2,
        title: 'Post 2',
        description: 'Description 2',
        user: {
          id: 2,
          username: 'user2',
          email: 'user2@test.com',
          createdAt: '2023-01-02T00:00:00Z',
        },
        createdAt: '2023-01-02T00:00:00Z',
        readTime: 3,
        readTimeFormatted: '3 min',
        likes: 15,
        isLikedByCurrentUser: false,
      },
      {
        id: 3,
        title: 'Post 3',
        description: 'Description 3',
        user: {
          id: 3,
          username: 'user3',
          email: 'user3@test.com',
          createdAt: '2023-01-03T00:00:00Z',
        },
        createdAt: '2023-01-03T00:00:00Z',
        readTime: 7,
        readTimeFormatted: '7 min',
        likes: 20,
        isLikedByCurrentUser: false,
      },
      {
        id: 4,
        title: 'Post 4',
        description: 'Description 4',
        user: {
          id: 4,
          username: 'user4',
          email: 'user4@test.com',
          createdAt: '2023-01-04T00:00:00Z',
        },
        createdAt: '2023-01-04T00:00:00Z',
        readTime: 4,
        readTimeFormatted: '4 min',
        likes: 12,
        isLikedByCurrentUser: false,
      },
      {
        id: 5,
        title: 'Post 5',
        description: 'Description 5',
        user: {
          id: 5,
          username: 'user5',
          email: 'user5@test.com',
          createdAt: '2023-01-05T00:00:00Z',
        },
        createdAt: '2023-01-05T00:00:00Z',
        readTime: 6,
        readTimeFormatted: '6 min',
        likes: 18,
        isLikedByCurrentUser: false,
      },
    ];

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => manyPosts,
    });

    const { result } = renderHook(() => useRelatedPosts(2));

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toHaveLength(0);
    expect(result.current.posts.find(post => post.id === 2)).toBeUndefined();
  });

  it('should handle HTTP error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useRelatedPosts(1));

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toEqual([]);
    expect(result.current.hasErrors).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Błąd podczas pobierania powiązanych postów:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('should handle network error', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useRelatedPosts(1));

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toEqual([]);
    expect(result.current.hasErrors).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Błąd podczas pobierania powiązanych postów:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('should not fetch when mainPostId is 0', () => {
    const { result } = renderHook(() => useRelatedPosts(0));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.posts).toEqual([]);
    expect(result.current.hasErrors).toBe(false);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should not fetch when mainPostId is falsy', () => {
    const { result } = renderHook(() => useRelatedPosts(null as any));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.posts).toEqual([]);
    expect(result.current.hasErrors).toBe(false);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should reset errors when starting new fetch', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result, rerender } = renderHook(
      ({ postId }) => useRelatedPosts(postId),
      { initialProps: { postId: 1 } }
    );

    await waitFor(
      () => {
        expect(result.current.hasErrors).toBe(true);
      },
      { timeout: 3000 }
    );

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    rerender({ postId: 2 });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    consoleSpy.mockRestore();
  });

  it('should handle empty response', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    const { result } = renderHook(() => useRelatedPosts(1));

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toEqual([]);
    expect(result.current.hasErrors).toBe(true);
  });
});
