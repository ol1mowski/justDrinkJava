import { renderHook, waitFor, act } from '@testing-library/react';
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
import { useLatestPost } from '../useLatestPost';

beforeAll(() => {
  vi.doMock('../../../../test/mocks/server', () => ({
    server: {
      listen: vi.fn(),
      close: vi.fn(),
      resetHandlers: vi.fn(),
    },
  }));
});

afterAll(() => {
  vi.clearAllMocks();
});

vi.mock('../../../../utils/api', () => ({
  apiService: {
    getLatestPost: vi.fn(),
  },
}));

import { apiService } from '../../../../utils/api';

const mockApiService = apiService as any;

describe('useLatestPost', () => {
  const mockPost = {
    id: 1,
    title: 'Test Post Title',
    description: 'Test post description',
    content: 'Test post content',
    imageUrl: 'https://example.com/image.jpg',
    readTimeFormatted: '5 min',
    createdAt: '2024-01-01T00:00:00Z',
    category: {
      id: 1,
      name: 'Java Core',
    },
    user: {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      createdAt: '2024-01-01T00:00:00Z',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with loading state', () => {
    mockApiService.getLatestPost.mockImplementation(
      () => new Promise(() => {})
    );

    const { result } = renderHook(() => useLatestPost());

    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('should fetch latest post successfully', async () => {
    mockApiService.getLatestPost.mockResolvedValue(mockPost);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockPost);
    expect(result.current.error).toBe(null);
    expect(mockApiService.getLatestPost).toHaveBeenCalledTimes(1);
  });

  it('should handle API error (Error instance)', async () => {
    const error = new Error('API Error');
    mockApiService.getLatestPost.mockRejectedValue(error);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('API Error');
  });

  it('should handle API error (non-Error)', async () => {
    mockApiService.getLatestPost.mockRejectedValue('String error');

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Wystąpił nieoczekiwany błąd');
  });

  it('should handle network error', async () => {
    const networkError = new Error('Network error');
    mockApiService.getLatestPost.mockRejectedValue(networkError);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Network error');
  });

  it('should refetch data successfully', async () => {
    mockApiService.getLatestPost.mockResolvedValue(mockPost);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockPost);

    const updatedPost = { ...mockPost, title: 'Updated Post Title' };
    mockApiService.getLatestPost.mockResolvedValue(updatedPost);

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toEqual(updatedPost);
    expect(result.current.error).toBe(null);
    expect(mockApiService.getLatestPost).toHaveBeenCalledTimes(2);
  });

  it('should handle refetch error', async () => {
    mockApiService.getLatestPost.mockResolvedValue(mockPost);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockPost);

    mockApiService.getLatestPost.mockRejectedValue(new Error('Refetch Error'));

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Refetch Error');
    expect(result.current.loading).toBe(false);
  });

  it('should set loading state during refetch', async () => {
    mockApiService.getLatestPost.mockResolvedValue(mockPost);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let resolveRefetch: (value: any) => void;
    const refetchPromise = new Promise(resolve => {
      resolveRefetch = resolve;
    });
    mockApiService.getLatestPost.mockReturnValue(refetchPromise);

    act(() => {
      result.current.refetch();
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);

    act(() => {
      resolveRefetch(mockPost);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it('should not update state after unmount', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise(resolve => {
      resolvePromise = resolve;
    });
    mockApiService.getLatestPost.mockReturnValue(promise);

    const { result, unmount } = renderHook(() => useLatestPost());

    expect(result.current.loading).toBe(true);

    unmount();

    act(() => {
      resolvePromise(mockPost);
    });
  });

  it('should handle post with null imageUrl', async () => {
    const postWithNullImage = { ...mockPost, imageUrl: null };
    mockApiService.getLatestPost.mockResolvedValue(postWithNullImage);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(postWithNullImage);
    expect(result.current.data?.imageUrl).toBe(null);
  });

  it('should handle post with empty imageUrl', async () => {
    const postWithEmptyImage = { ...mockPost, imageUrl: '' };
    mockApiService.getLatestPost.mockResolvedValue(postWithEmptyImage);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(postWithEmptyImage);
    expect(result.current.data?.imageUrl).toBe('');
  });

  it('should handle post without category', async () => {
    const postWithoutCategory = { ...mockPost, category: null };
    mockApiService.getLatestPost.mockResolvedValue(postWithoutCategory);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(postWithoutCategory);
    expect(result.current.data?.category).toBe(null);
  });

  it('should clear error state when refetching successfully', async () => {
    mockApiService.getLatestPost.mockRejectedValue(new Error('Initial Error'));

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.error).toBe('Initial Error');
    });

    mockApiService.getLatestPost.mockResolvedValue(mockPost);

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toEqual(mockPost);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  it('should handle multiple rapid refetch calls', async () => {
    mockApiService.getLatestPost.mockResolvedValue(mockPost);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const promises = [
      result.current.refetch(),
      result.current.refetch(),
      result.current.refetch(),
    ];

    await act(async () => {
      await Promise.all(promises);
    });

    expect(result.current.data).toEqual(mockPost);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(false);
  });
});
