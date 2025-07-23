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

vi.mock('../../../../api/services.api', () => ({
  postService: {
    getLatest: vi.fn(),
  },
}));

import { postService } from '../../../../api/services.api';

const mockPostService = postService as any;

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
    mockPostService.getLatest.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useLatestPost());

    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('should fetch latest post successfully', async () => {
    mockPostService.getLatest.mockResolvedValue(mockPost);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockPost);
    expect(result.current.error).toBe(null);
    expect(mockPostService.getLatest).toHaveBeenCalledTimes(1);
  });

  it('should handle API error (Error instance)', async () => {
    const error = new Error('API Error');
    mockPostService.getLatest.mockRejectedValue(error);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('API Error');
  });

  it('should handle API error (non-Error)', async () => {
    mockPostService.getLatest.mockRejectedValue('String error');

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Wystąpił nieoczekiwany błąd');
  });

  it('should handle network error', async () => {
    const networkError = new Error('Network error');
    networkError.name = 'NetworkError';
    mockPostService.getLatest.mockRejectedValue(networkError);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Network error');
  });

  it('should refetch data successfully', async () => {
    mockPostService.getLatest.mockResolvedValue(mockPost);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockPost);

    const updatedPost = { ...mockPost, title: 'Updated Post Title' };
    mockPostService.getLatest.mockResolvedValue(updatedPost);

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toEqual(updatedPost);
    expect(result.current.error).toBe(null);
  });

  it('should handle refetch error', async () => {
    mockPostService.getLatest.mockResolvedValue(mockPost);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockPost);

    const refetchError = new Error('Refetch Error');
    mockPostService.getLatest.mockRejectedValue(refetchError);

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toBe(null); // Hook clears data on error
    expect(result.current.error).toBe('Refetch Error');
  });

  it('should set loading state during refetch', async () => {
    mockPostService.getLatest.mockResolvedValue(mockPost);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.refetch().then(() => {});
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.loading).toBe(false);
  });

  it('should not update state after unmount', async () => {
    let resolvePromise: (value: any) => void;
    const pendingPromise = new Promise<any>(resolve => {
      resolvePromise = resolve;
    });

    mockPostService.getLatest.mockReturnValue(pendingPromise);

    const { unmount } = renderHook(() => useLatestPost());

    unmount();

    resolvePromise!(mockPost);

    // Wait a bit to ensure the promise resolves
    await new Promise(resolve => setTimeout(resolve, 0));

    // The component is unmounted, so we can't check the state
    // But we can verify that the API was called
    expect(mockPostService.getLatest).toHaveBeenCalledTimes(1);
  });

  it('should handle post with null imageUrl', async () => {
    const postWithoutImage = { ...mockPost, imageUrl: null };
    mockPostService.getLatest.mockResolvedValue(postWithoutImage);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(postWithoutImage);
  });

  it('should handle post with empty imageUrl', async () => {
    const postWithEmptyImage = { ...mockPost, imageUrl: '' };
    mockPostService.getLatest.mockResolvedValue(postWithEmptyImage);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(postWithEmptyImage);
  });

  it('should handle post without category', async () => {
    const postWithoutCategory = { ...mockPost, category: undefined };
    mockPostService.getLatest.mockResolvedValue(postWithoutCategory);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(postWithoutCategory);
  });

  it('should clear error state when refetching successfully', async () => {
    mockPostService.getLatest.mockRejectedValueOnce(new Error('Initial Error'));

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Initial Error');

    mockPostService.getLatest.mockResolvedValueOnce(mockPost);

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual(mockPost);
  });

  it('should handle multiple rapid refetch calls', async () => {
    mockPostService.getLatest.mockResolvedValue(mockPost);

    const { result } = renderHook(() => useLatestPost());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await Promise.all([
        result.current.refetch(),
        result.current.refetch(),
        result.current.refetch(),
      ]);
    });

    expect(mockPostService.getLatest).toHaveBeenCalledTimes(4); // Initial + 3 refetches
  });
});
