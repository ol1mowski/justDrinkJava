import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePost } from '../usePost.hook';

vi.mock('../../../../api/services.api', () => ({
  postService: {
    getById: vi.fn(),
  },
}));

import { postService } from '../../../../api/services.api';
const mockPostService = postService as any;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        retryDelay: 0,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePost', () => {
  const mockPost = {
    id: 1,
    title: 'Test Post',
    content: 'Test content',
    likes: 5,
    isLikedByCurrentUser: false,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch post by ID successfully', async () => {
    mockPostService.getById.mockResolvedValue(mockPost);
    const { result } = renderHook(() => usePost(1), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.post).toEqual(mockPost);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
    expect(mockPostService.getById).toHaveBeenCalledWith(1);
  });

  it('should handle API error', async () => {
    const error = new Error('Not found');
    mockPostService.getById.mockRejectedValue(error);
    const { result } = renderHook(() => usePost(999), {
      wrapper: createWrapper(),
    });
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(result.current.error).toEqual(error);
    expect(result.current.post).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
  });

  it('should not fetch when postId is 0', () => {
    const { result } = renderHook(() => usePost(0), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.post).toBeUndefined();
    expect(mockPostService.getById).not.toHaveBeenCalled();
  });

  it('should not fetch when enabled is false', () => {
    const { result } = renderHook(() => usePost(1, { enabled: false }), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.post).toBeUndefined();
    expect(mockPostService.getById).not.toHaveBeenCalled();
  });

  it('should use custom stale time', async () => {
    mockPostService.getById.mockResolvedValue(mockPost);
    const { result } = renderHook(() => usePost(1, { staleTime: 10000 }), {
      wrapper: createWrapper(),
    });
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.post).toEqual(mockPost);
    expect(mockPostService.getById).toHaveBeenCalledWith(1);
  });

  it('should handle 404 error without retry', async () => {
    const error = new Error('Not found');
    (error as any).status = 404;
    mockPostService.getById.mockRejectedValue(error);
    const { result } = renderHook(() => usePost(999), {
      wrapper: createWrapper(),
    });
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(result.current.error).toEqual(error);
    expect(mockPostService.getById).toHaveBeenCalledTimes(1);
  });
});
