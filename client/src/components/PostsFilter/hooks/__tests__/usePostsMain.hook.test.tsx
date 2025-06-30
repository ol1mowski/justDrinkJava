import { renderHook, act, waitFor } from '@testing-library/react';
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
import { usePostsMain } from '../usePostsMain.hook';
import type { PostDTO } from '../../types';
import { server } from '../../../../test/mocks/server';

// Disable MSW for these tests
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

describe('usePostsMain', () => {
  const mockPosts: PostDTO[] = [
    {
      id: 1,
      user: { id: 1, username: 'user1' },
      category: { id: 1, name: 'Programming' },
      title: 'React Best Practices',
      description: 'Learn React best practices',
      createdAt: '2023-01-01T00:00:00Z',
      readTime: 10,
    },
    {
      id: 2,
      user: { id: 2, username: 'user2' },
      category: { id: 2, name: 'Design' },
      title: 'UI Design Principles',
      description: 'Essential UI design principles',
      createdAt: '2023-01-02T00:00:00Z',
      readTime: 5,
    },
    {
      id: 3,
      user: { id: 3, username: 'user3' },
      category: { id: 1, name: 'Programming' },
      title: 'JavaScript Tips',
      description: 'Advanced JavaScript tips',
      createdAt: '2023-01-03T00:00:00Z',
      readTime: 8,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with default values', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    const { result } = renderHook(() => usePostsMain(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.posts).toEqual([]);
    expect(result.current.categories).toEqual([]);
    expect(result.current.filteredPosts).toEqual([]);
    expect(result.current.sortBy).toBe('newest');
    expect(result.current.filters).toEqual({
      searchQuery: '',
      category: undefined,
    });
    expect(result.current.error).toBeNull();

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );
  });

  it('should load posts and extract categories', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    const { result } = renderHook(() => usePostsMain(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toEqual(mockPosts);
    expect(result.current.categories).toHaveLength(2);
    expect(result.current.categories).toEqual([
      { id: 1, name: 'Programming' },
      { id: 2, name: 'Design' },
    ]);
    expect(result.current.filteredPosts[0].id).toBe(3);
    expect(result.current.filteredPosts[1].id).toBe(2);
    expect(result.current.filteredPosts[2].id).toBe(1);
  });

  it('should filter posts by search query', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    const { result } = renderHook(() => usePostsMain(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    act(() => {
      result.current.setFilters({ searchQuery: 'React' });
    });

    expect(result.current.filteredPosts).toHaveLength(1);
    expect(result.current.filteredPosts[0].title).toBe('React Best Practices');
  });

  it('should filter posts by category', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    const { result } = renderHook(() => usePostsMain(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    act(() => {
      result.current.setFilters({ category: 'Programming' });
    });

    expect(result.current.filteredPosts).toHaveLength(2);
    expect(
      result.current.filteredPosts.every(
        post => post.category.name === 'Programming'
      )
    ).toBe(true);
  });

  it('should sort posts by different criteria', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    const { result } = renderHook(() => usePostsMain(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    act(() => {
      result.current.setSortBy('oldest');
    });

    expect(result.current.filteredPosts[0].id).toBe(1);
    expect(result.current.filteredPosts[2].id).toBe(3);

    act(() => {
      result.current.setSortBy('readTime');
    });

    expect(result.current.filteredPosts[0].readTime).toBe(5);
    expect(result.current.filteredPosts[2].readTime).toBe(10);

    act(() => {
      result.current.setSortBy('title');
    });

    expect(result.current.filteredPosts[0].title).toBe('JavaScript Tips');
    expect(result.current.filteredPosts[2].title).toBe('UI Design Principles');
  });

  it('should combine search and category filters', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    const { result } = renderHook(() => usePostsMain(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    act(() => {
      result.current.setFilters({
        searchQuery: 'best',
        category: 'Programming',
      });
    });

    expect(result.current.filteredPosts).toHaveLength(1);
    expect(result.current.filteredPosts[0].title).toBe('React Best Practices');
  });

  it('should handle empty posts response', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    const { result } = renderHook(() => usePostsMain(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toEqual([]);
    expect(result.current.categories).toEqual([]);
    expect(result.current.filteredPosts).toEqual([]);
  });

  it('should handle error state', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const { result } = renderHook(() => usePostsMain(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.posts).toEqual([]);
    expect(result.current.categories).toEqual([]);
    expect(result.current.filteredPosts).toEqual([]);
    expect(result.current.error).toContain('Failed to fetch posts: 500');
  });

  it('should provide refresh function', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    const { result } = renderHook(() => usePostsMain(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(typeof result.current.refreshPosts).toBe('function');
  });

  it('should update filters correctly', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    const { result } = renderHook(() => usePostsMain(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    act(() => {
      result.current.setFilters({ searchQuery: 'test' });
    });

    expect(result.current.filters.searchQuery).toBe('test');

    act(() => {
      result.current.setFilters({ category: 'Design' });
    });

    expect(result.current.filters).toEqual({
      searchQuery: 'test',
      category: 'Design',
    });
  });

  it('should handle case-insensitive search', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    const { result } = renderHook(() => usePostsMain(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    act(() => {
      result.current.setFilters({ searchQuery: 'REACT' });
    });

    expect(result.current.filteredPosts).toHaveLength(1);
    expect(result.current.filteredPosts[0].title).toBe('React Best Practices');
  });
});
