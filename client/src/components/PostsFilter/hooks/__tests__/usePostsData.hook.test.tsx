import { renderHook, waitFor } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePostsData } from '../usePostsData.hook';
import type { PostDTO } from '../../types';
import { server } from '../../../../test/mocks/server';

beforeAll(() => server.close());
afterAll(() => server.listen({ onUnhandledRequest: 'error' }));

vi.mock('../../../api', () => ({
  API_BASE_URL: 'http://localhost:8080/api',
}));

Object.defineProperty(global, 'fetch', {
  value: vi.fn(),
  writable: true,
});

const mockFetch = global.fetch as any;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePostsData', () => {
  const mockPosts: PostDTO[] = [
    {
      id: 1,
      user: { id: 1, username: 'user1' },
      category: { id: 1, name: 'Programming' },
      title: 'Test Post 1',
      description: 'Description 1',
      createdAt: '2023-01-01T00:00:00Z',
      readTime: 5,
    },
    {
      id: 2,
      user: { id: 2, username: 'user2' },
      category: { id: 2, name: 'Design' },
      title: 'Test Post 2',
      description: 'Description 2',
      createdAt: '2023-01-02T00:00:00Z',
      readTime: 3,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch posts successfully', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    const { result } = renderHook(() => usePostsData(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.data).toEqual(mockPosts);
    expect(result.current.error).toBeNull();
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/posts?limit=50'
    );
  });

  it('should handle HTTP error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const { result } = renderHook(() => usePostsData(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toContain(
      'Failed to fetch posts: 500'
    );
  });

  it('should handle network error', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => usePostsData(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Network error');
  });

  it('should handle empty response', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    const { result } = renderHook(() => usePostsData(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle 404 error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const { result } = renderHook(() => usePostsData(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toContain(
      'Failed to fetch posts: 404'
    );
  });

  it('should handle 403 error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
    });

    const { result } = renderHook(() => usePostsData(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toContain(
      'Failed to fetch posts: 403'
    );
  });

  it('should provide refetch function', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    const { result } = renderHook(() => usePostsData(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(typeof result.current.refetch).toBe('function');
  });

  it('should handle malformed JSON response', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    });

    const { result } = renderHook(() => usePostsData(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Invalid JSON');
  });
});
