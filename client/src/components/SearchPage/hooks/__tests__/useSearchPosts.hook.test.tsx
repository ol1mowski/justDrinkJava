import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSearchPosts, useSearchPostsSuspense } from '../useSearchPosts.hook';
import type { PostDTO } from '../../../PostsFilter/types';
import { server } from '../../../../test/mocks/server';
import { http, HttpResponse } from 'msw';

// Mock queryKeys
vi.mock('../../../../lib/queryKeys', () => ({
  queryKeys: {
    posts: {
      search: vi.fn((query: string) => ['posts', 'search', query]),
    },
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useSearchPosts', () => {
  const mockPosts: PostDTO[] = [
    {
      id: 1,
      title: 'Test Post 1',
      description: 'Test description 1',
      createdAt: '2023-01-01T00:00:00Z',
      readTime: 5,
      imageUrl: 'https://example.com/image1.jpg',
      likes: 10,
      isLikedByCurrentUser: false,
      user: {
        id: 1,
        username: 'testuser1',
        avatarUrl: 'https://example.com/avatar1.jpg',
      },
      category: {
        id: 1,
        name: 'Technology',
      },
    },
    {
      id: 2,
      title: 'Test Post 2',
      description: 'Test description 2',
      createdAt: '2023-01-02T00:00:00Z',
      readTime: 3,
      imageUrl: 'https://example.com/image2.jpg',
      likes: 5,
      isLikedByCurrentUser: true,
      user: {
        id: 2,
        username: 'testuser2',
        avatarUrl: 'https://example.com/avatar2.jpg',
      },
      category: {
        id: 2,
        name: 'Science',
      },
    },
  ];

  const mockSearchResponse = {
    posts: mockPosts,
    totalCount: 2,
    hasMore: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSearchPosts({}), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should search posts with query parameter', async () => {
    server.use(
      http.get('*/posts/search', () => {
        return HttpResponse.json(mockSearchResponse);
      })
    );

    const { result } = renderHook(
      () => useSearchPosts({ query: 'test query' }),
      { wrapper: createWrapper() }
    );

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.data).toBeDefined();
      },
      { timeout: 3000 }
    );

    expect(result.current.data?.pages[0].posts).toEqual(mockPosts);
    expect(result.current.data?.pages[0].totalCount).toBe(2);
    expect(result.current.data?.pages[0].hasMore).toBe(false);
  });

  it('should search posts with category parameter', async () => {
    server.use(
      http.get('*/posts/search', () => {
        return HttpResponse.json(mockSearchResponse);
      })
    );

    const { result } = renderHook(
      () => useSearchPosts({ category: 'Technology' }),
      { wrapper: createWrapper() }
    );

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.data).toBeDefined();
      },
      { timeout: 3000 }
    );
  });

  it('should search posts with hashtag parameter', async () => {
    server.use(
      http.get('*/posts/search', () => {
        return HttpResponse.json(mockSearchResponse);
      })
    );

    const { result } = renderHook(
      () => useSearchPosts({ hashtag: 'programming' }),
      { wrapper: createWrapper() }
    );

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.data).toBeDefined();
      },
      { timeout: 3000 }
    );
  });

  it('should search posts with custom page size', async () => {
    server.use(
      http.get('*/posts/search', () => {
        return HttpResponse.json(mockSearchResponse);
      })
    );

    const { result } = renderHook(
      () => useSearchPosts({ query: 'test', pageSize: 20 }),
      { wrapper: createWrapper() }
    );

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.data).toBeDefined();
      },
      { timeout: 3000 }
    );
  });

  it('should handle multiple search parameters', async () => {
    server.use(
      http.get('*/posts/search', () => {
        return HttpResponse.json(mockSearchResponse);
      })
    );

    const { result } = renderHook(
      () =>
        useSearchPosts({
          query: 'test',
          category: 'Technology',
          hashtag: 'programming',
          pageSize: 15,
        }),
      { wrapper: createWrapper() }
    );

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.data).toBeDefined();
      },
      { timeout: 3000 }
    );
  });

  it('should handle pagination correctly', async () => {
    const firstPageResponse = {
      posts: mockPosts.slice(0, 1),
      totalCount: 2,
      hasMore: true,
    };

    const secondPageResponse = {
      posts: mockPosts.slice(1),
      totalCount: 2,
      hasMore: false,
    };

    let callCount = 0;
    server.use(
      http.get('*/posts/search', () => {
        callCount++;
        if (callCount === 1) {
          return HttpResponse.json(firstPageResponse);
        } else {
          return HttpResponse.json(secondPageResponse);
        }
      })
    );

    const { result } = renderHook(() => useSearchPosts({ query: 'test' }), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.data?.pages[0].posts).toHaveLength(1);
        expect(result.current.data?.pages[0].hasMore).toBe(true);
      },
      { timeout: 3000 }
    );

    await result.current.fetchNextPage();

    await waitFor(
      () => {
        expect(result.current.data?.pages).toHaveLength(2);
        expect(result.current.data?.pages[1].posts).toHaveLength(1);
        expect(result.current.data?.pages[1].hasMore).toBe(false);
      },
      { timeout: 3000 }
    );
  });

  it('should handle HTTP error responses', async () => {
    server.use(
      http.get('*/posts/search', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    const { result } = renderHook(() => useSearchPosts({ query: 'test' }), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.error).toBeDefined();
        expect(result.current.error?.message).toContain(
          'Failed to search posts: 404'
        );
      },
      { timeout: 3000 }
    );
  });

  it('should handle network errors', async () => {
    server.use(
      http.get('*/posts/search', () => {
        return HttpResponse.error();
      })
    );

    const { result } = renderHook(() => useSearchPosts({ query: 'test' }), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.error).toBeDefined();
      },
      { timeout: 3000 }
    );
  });

  it('should not fetch when no search parameters are provided', () => {
    const { result } = renderHook(() => useSearchPosts({}), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('should handle empty response', async () => {
    server.use(
      http.get('*/posts/search', () => {
        return HttpResponse.json({
          posts: [],
          totalCount: 0,
          hasMore: false,
        });
      })
    );

    const { result } = renderHook(
      () => useSearchPosts({ query: 'nonexistent' }),
      { wrapper: createWrapper() }
    );

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.data?.pages[0].posts).toEqual([]);
        expect(result.current.data?.pages[0].totalCount).toBe(0);
        expect(result.current.data?.pages[0].hasMore).toBe(false);
      },
      { timeout: 3000 }
    );
  });

  it('should handle malformed JSON response', async () => {
    server.use(
      http.get('*/posts/search', () => {
        return new HttpResponse('Invalid JSON', {
          headers: { 'Content-Type': 'application/json' },
        });
      })
    );

    const { result } = renderHook(() => useSearchPosts({ query: 'test' }), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.error).toBeDefined();
      },
      { timeout: 3000 }
    );
  });
});

describe('useSearchPostsSuspense', () => {
  const mockPosts: PostDTO[] = [
    {
      id: 1,
      title: 'Test Post 1',
      description: 'Test description 1',
      createdAt: '2023-01-01T00:00:00Z',
      readTime: 5,
      imageUrl: 'https://example.com/image1.jpg',
      likes: 10,
      isLikedByCurrentUser: false,
      user: {
        id: 1,
        username: 'testuser1',
        avatarUrl: 'https://example.com/avatar1.jpg',
      },
      category: {
        id: 1,
        name: 'Technology',
      },
    },
  ];

  const mockSearchResponse = {
    posts: mockPosts,
    totalCount: 1,
    hasMore: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it('should fetch posts with suspense', async () => {
    server.use(
      http.get('*/posts/search', () => {
        return HttpResponse.json(mockSearchResponse);
      })
    );

    const { result } = renderHook(
      () => useSearchPostsSuspense({ query: 'test' }),
      { wrapper: createWrapper() }
    );

    await waitFor(
      () => {
        expect(result.current.data).toBeDefined();
      },
      { timeout: 3000 }
    );

    expect(result.current.data?.pages[0].posts).toEqual(mockPosts);
    expect(result.current.data?.pages[0].totalCount).toBe(1);
    expect(result.current.data?.pages[0].hasMore).toBe(false);
  });
});
