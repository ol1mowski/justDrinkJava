import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  usePostContent,
  usePostContentByPostId,
  useAllPostContent,
} from '../usePostContent.hook';
import { PostContentApiError } from '../../../../api/postContent.api';

vi.mock('../../../../api/postContent.api', () => ({
  postContentApi: {
    getById: vi.fn(),
    getByPostId: vi.fn(),
    getAll: vi.fn(),
  },
  PostContentApiError: class PostContentApiError extends Error {
    public status: number;
    public error: string;
    public path: string;
    public timestamp: string;

    constructor(
      status: number,
      error: string,
      message: string,
      path: string,
      timestamp: string
    ) {
      super(message);
      this.name = 'PostContentApiError';
      this.status = status;
      this.error = error;
      this.path = path;
      this.timestamp = timestamp;
    }
  },
}));

import { postContentApi } from '../../../../api/postContent.api';

const mockPostContentApi = postContentApi as any;

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

const mockPostContent = {
  id: 1,
  content: 'Test content',
  postId: 123,
  categoryId: 1,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
};

const mockPostContents = [
  mockPostContent,
  {
    id: 2,
    content: 'Test content 2',
    postId: 124,
    categoryId: 1,
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
  },
];

describe('usePostContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch post content by ID successfully', async () => {
    mockPostContentApi.getById.mockResolvedValue(mockPostContent);

    const { result } = renderHook(() => usePostContent(1), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.content).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.content).toEqual(mockPostContent);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
    expect(mockPostContentApi.getById).toHaveBeenCalledWith(1);
  });

  it('should handle API error when fetching by ID', async () => {
    const error = new PostContentApiError(
      404,
      'Not Found',
      'Post content not found',
      '/post-content/999',
      '2023-01-01T00:00:00Z'
    );
    mockPostContentApi.getById.mockRejectedValue(error);

    const { result } = renderHook(() => usePostContent(999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.content).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
  });

  it('should not fetch when contentId is 0', () => {
    const { result } = renderHook(() => usePostContent(0), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.content).toBeUndefined();
    expect(mockPostContentApi.getById).not.toHaveBeenCalled();
  });

  it('should not fetch when enabled is false', () => {
    const { result } = renderHook(() => usePostContent(1, { enabled: false }), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.content).toBeUndefined();
    expect(mockPostContentApi.getById).not.toHaveBeenCalled();
  });

  it('should use custom stale time', async () => {
    mockPostContentApi.getById.mockResolvedValue(mockPostContent);

    const { result } = renderHook(
      () => usePostContent(1, { staleTime: 10000 }),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockPostContentApi.getById).toHaveBeenCalledWith(1);
  });
});

describe('usePostContentByPostId', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch post content by post ID successfully', async () => {
    mockPostContentApi.getByPostId.mockResolvedValue(mockPostContent);

    const { result } = renderHook(() => usePostContentByPostId(123), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.content).toBeUndefined();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.content).toEqual(mockPostContent);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
    expect(mockPostContentApi.getByPostId).toHaveBeenCalledWith(123);
  });

  it('should handle API error when fetching by post ID', async () => {
    const error = new PostContentApiError(
      404,
      'Not Found',
      'Post not found',
      '/post-content/post/999',
      '2023-01-01T00:00:00Z'
    );
    mockPostContentApi.getByPostId.mockRejectedValue(error);

    const { result } = renderHook(() => usePostContentByPostId(999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.content).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
  });

  it('should not fetch when postId is 0', () => {
    const { result } = renderHook(() => usePostContentByPostId(0), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.content).toBeUndefined();
    expect(mockPostContentApi.getByPostId).not.toHaveBeenCalled();
  });

  it('should not fetch when enabled is false', () => {
    const { result } = renderHook(
      () => usePostContentByPostId(123, { enabled: false }),
      {
        wrapper: createWrapper(),
      }
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.content).toBeUndefined();
    expect(mockPostContentApi.getByPostId).not.toHaveBeenCalled();
  });
});

describe('useAllPostContent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch all post content successfully', async () => {
    mockPostContentApi.getAll.mockResolvedValue(mockPostContents);

    const { result } = renderHook(() => useAllPostContent(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.contents).toEqual([]);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.contents).toEqual(mockPostContents);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
    expect(mockPostContentApi.getAll).toHaveBeenCalledWith(undefined);
  });

  it('should fetch post content by category ID', async () => {
    mockPostContentApi.getAll.mockResolvedValue(mockPostContents);

    const { result } = renderHook(() => useAllPostContent(1), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.contents).toEqual(mockPostContents);
    expect(mockPostContentApi.getAll).toHaveBeenCalledWith(1);
  });

  it('should handle API error when fetching all content', async () => {
    const error = new PostContentApiError(
      500,
      'Internal Server Error',
      'Server error',
      '/post-content',
      '2023-01-01T00:00:00Z'
    );
    mockPostContentApi.getAll.mockRejectedValue(error);

    const { result } = renderHook(() => useAllPostContent(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.contents).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(false);
  });

  it('should not fetch when enabled is false', () => {
    const { result } = renderHook(
      () => useAllPostContent(undefined, { enabled: false }),
      {
        wrapper: createWrapper(),
      }
    );

    expect(result.current.isLoading).toBe(false);
    expect(result.current.contents).toEqual([]);
    expect(mockPostContentApi.getAll).not.toHaveBeenCalled();
  });

  it('should return empty array when no data', async () => {
    mockPostContentApi.getAll.mockResolvedValue([]);

    const { result } = renderHook(() => useAllPostContent(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.contents).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });
});

describe('Retry behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should not retry on 404 error for usePostContent', async () => {
    const error = new PostContentApiError(
      404,
      'Not Found',
      'Post content not found',
      '/post-content/999',
      '2023-01-01T00:00:00Z'
    );
    mockPostContentApi.getById.mockRejectedValue(error);

    const { result } = renderHook(() => usePostContent(999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockPostContentApi.getById).toHaveBeenCalledTimes(1);
  });

  it('should not retry on 404 error for usePostContentByPostId', async () => {
    const error = new PostContentApiError(
      404,
      'Not Found',
      'Post not found',
      '/post-content/post/999',
      '2023-01-01T00:00:00Z'
    );
    mockPostContentApi.getByPostId.mockRejectedValue(error);

    const { result } = renderHook(() => usePostContentByPostId(999), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockPostContentApi.getByPostId).toHaveBeenCalledTimes(1);
  });
});
