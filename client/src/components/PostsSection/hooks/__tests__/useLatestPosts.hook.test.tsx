import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../../../test/mocks/server';
import { useLatestPosts } from '../useLatestPosts.hook';
import type { PostData } from '../../../../utils/api';

vi.mock('../../../../api', () => ({
  API_BASE_URL: 'http://localhost:8080/api',
}));

describe('useLatestPosts', () => {
  const mockPosts: PostData[] = [
    {
      id: 1,
      user: {
        id: 1,
        username: 'user1',
        email: 'user1@test.com',
        createdAt: '2023-01-01T00:00:00Z',
      },
      category: { id: 1, name: 'Programming' },
      title: 'Test Post 1',
      description: 'Description 1',
      createdAt: '2023-01-01T00:00:00Z',
      readTime: 5,
      readTimeFormatted: '5 min',
      likes: 10,
      isLikedByCurrentUser: false,
    },
    {
      id: 2,
      user: {
        id: 2,
        username: 'user2',
        email: 'user2@test.com',
        createdAt: '2023-01-02T00:00:00Z',
      },
      category: { id: 2, name: 'Design' },
      title: 'Test Post 2',
      description: 'Description 2',
      createdAt: '2023-01-02T00:00:00Z',
      readTime: 3,
      readTimeFormatted: '3 min',
      likes: 15,
      isLikedByCurrentUser: false,
    },
  ];

  beforeEach(() => {
    server.use(
      http.get('http://localhost:8080/api/posts', ({ request }) => {
        const url = new URL(request.url);
        const limit = url.searchParams.get('limit');
        const postsToReturn = limit
          ? mockPosts.slice(0, parseInt(limit))
          : mockPosts;
        return HttpResponse.json(postsToReturn);
      })
    );
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it('should fetch latest posts successfully with default limit', async () => {
    const { result } = renderHook(() => useLatestPosts());

    expect(result.current.loading).toBe(true);
    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.hasError).toBe(false);

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toEqual(mockPosts);
    expect(result.current.error).toBeNull();
    expect(result.current.hasError).toBe(false);
  });

  it('should fetch latest posts with custom limit', async () => {
    const { result } = renderHook(() => useLatestPosts(1));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toEqual([mockPosts[0]]);
    expect(result.current.error).toBeNull();
    expect(result.current.hasError).toBe(false);
  });

  it('should handle HTTP error', async () => {
    server.use(
      http.get('http://localhost:8080/api/posts', () => {
        return HttpResponse.json(
          { message: 'Internal Server Error' },
          { status: 500 }
        );
      })
    );

    const { result } = renderHook(() => useLatestPosts());

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toContain('HTTP 500');
    expect(result.current.hasError).toBe(true);
  });

  it('should handle network error', async () => {
    server.use(
      http.get('http://localhost:8080/api/posts', () => {
        return HttpResponse.error();
      })
    );

    const { result } = renderHook(() => useLatestPosts());

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toContain('Failed to fetch');
    expect(result.current.hasError).toBe(true);
  });

  it('should handle empty response', async () => {
    server.use(
      http.get('http://localhost:8080/api/posts', () => {
        return HttpResponse.json([]);
      })
    );

    const { result } = renderHook(() => useLatestPosts());

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.hasError).toBe(false);
  });

  it('should provide refetch function', async () => {
    const { result } = renderHook(() => useLatestPosts());

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(typeof result.current.refetch).toBe('function');

    result.current.refetch();

    await waitFor(
      () => {
        expect(result.current.posts).toEqual(mockPosts);
      },
      { timeout: 3000 }
    );
  });

  it('should provide clearError function', async () => {
    server.use(
      http.get('http://localhost:8080/api/posts', () => {
        return HttpResponse.error();
      })
    );

    const { result } = renderHook(() => useLatestPosts());

    await waitFor(
      () => {
        expect(result.current.hasError).toBe(true);
      },
      { timeout: 3000 }
    );

    expect(typeof result.current.clearError).toBe('function');

    expect(() => result.current.clearError()).not.toThrow();
  });

  it('should refetch when limit changes', async () => {
    const { result, rerender } = renderHook(
      ({ limit }) => useLatestPosts(limit),
      { initialProps: { limit: 1 } }
    );

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toEqual([mockPosts[0]]);

    rerender({ limit: 2 });

    await waitFor(
      () => {
        expect(result.current.posts).toEqual([mockPosts[0], mockPosts[1]]);
      },
      { timeout: 3000 }
    );
  });

  it('should handle 404 error', async () => {
    server.use(
      http.get('http://localhost:8080/api/posts', () => {
        return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
      })
    );

    const { result } = renderHook(() => useLatestPosts());

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toContain('HTTP 404');
    expect(result.current.hasError).toBe(true);
  });

  it('should handle 403 error', async () => {
    server.use(
      http.get('http://localhost:8080/api/posts', () => {
        return HttpResponse.json({ message: 'Forbidden' }, { status: 403 });
      })
    );

    const { result } = renderHook(() => useLatestPosts());

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toContain('HTTP 403');
    expect(result.current.hasError).toBe(true);
  });

  it('should handle malformed JSON response', async () => {
    server.use(
      http.get('http://localhost:8080/api/posts', () => {
        return new HttpResponse('Invalid JSON', {
          headers: { 'Content-Type': 'application/json' },
        });
      })
    );

    const { result } = renderHook(() => useLatestPosts());

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toContain('Invalid JSON');
    expect(result.current.hasError).toBe(true);
  });
});
