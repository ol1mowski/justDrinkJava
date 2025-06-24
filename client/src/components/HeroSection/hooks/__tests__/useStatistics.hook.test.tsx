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
import { useStatistics } from '../useStatistics.hook';

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

vi.mock('../../../../hooks/useErrorHandler.hook', () => ({
  useErrorHandler: vi.fn(),
}));

vi.mock('../../../../utils/api', () => ({
  API_BASE_URL: 'http://localhost:8080/api',
}));

import { useErrorHandler } from '../../../../hooks/useErrorHandler.hook';

const mockUseErrorHandler = useErrorHandler as any;
const mockHandleError = vi.fn();
const mockClearError = vi.fn();

const originalFetch = global.fetch;
const mockFetch = vi.fn();

beforeAll(() => {
  global.fetch = mockFetch;
});

afterAll(() => {
  global.fetch = originalFetch;
});

describe('useStatistics', () => {
  const mockStatistics = {
    postsCount: 150,
    quizzesCount: 25,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();

    mockUseErrorHandler.mockReturnValue({
      error: null,
      handleError: mockHandleError,
      clearError: mockClearError,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with loading state', () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useStatistics());

    expect(result.current.statistics).toBe(null);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.hasError).toBe(false);
  });

  it('should fetch statistics successfully', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockStatistics),
    });

    const { result } = renderHook(() => useStatistics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.statistics).toEqual(mockStatistics);
    expect(result.current.error).toBe(null);
    expect(result.current.hasError).toBe(false);
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/statistics'
    );
  });

  it('should handle API error', async () => {
    const error = new Error('Statistics API error');
    mockFetch.mockRejectedValue(error);

    const { result } = renderHook(() => useStatistics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockHandleError).toHaveBeenCalledWith(
      error,
      'FETCH_STATISTICS_ERROR'
    );
    expect(result.current.statistics).toBe(null);
    expect(mockClearError).toHaveBeenCalled();
  });

  it('should handle HTTP error responses', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const { result } = renderHook(() => useStatistics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockHandleError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'HTTP 500: Internal Server Error',
      }),
      'FETCH_STATISTICS_ERROR'
    );
  });

  it('should handle 404 error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const { result } = renderHook(() => useStatistics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockHandleError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'HTTP 404: Not Found',
      }),
      'FETCH_STATISTICS_ERROR'
    );
  });

  it('should handle JSON parsing error', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.reject(new Error('Invalid JSON')),
    });

    const { result } = renderHook(() => useStatistics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockHandleError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Invalid JSON',
      }),
      'FETCH_STATISTICS_ERROR'
    );
  });

  it('should handle network error', async () => {
    const networkError = new Error('Network error');
    mockFetch.mockRejectedValue(networkError);

    const { result } = renderHook(() => useStatistics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockHandleError).toHaveBeenCalledWith(
      networkError,
      'FETCH_STATISTICS_ERROR'
    );
  });

  it('should handle refetch successfully', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockStatistics),
    });

    const { result } = renderHook(() => useStatistics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.statistics).toEqual(mockStatistics);

    mockFetch.mockClear();
    const updatedStatistics = { postsCount: 200, quizzesCount: 30 };
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(updatedStatistics),
    });

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.statistics).toEqual(updatedStatistics);
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should handle refetch error', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockStatistics),
    });

    const { result } = renderHook(() => useStatistics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.statistics).toEqual(mockStatistics);

    const refetchError = new Error('Refetch failed');
    mockFetch.mockRejectedValue(refetchError);

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(mockHandleError).toHaveBeenCalledWith(
        refetchError,
        'FETCH_STATISTICS_ERROR'
      );
    });
  });

  it('should clear error on successful refetch', async () => {
    mockFetch.mockRejectedValue(new Error('Initial error'));

    const { result } = renderHook(() => useStatistics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    mockFetch.mockClear();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockStatistics),
    });

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(result.current.statistics).toEqual(mockStatistics);
    });

    expect(mockClearError).toHaveBeenCalled();
  });

  it('should handle zero statistics', async () => {
    const zeroStatistics = { postsCount: 0, quizzesCount: 0 };
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(zeroStatistics),
    });

    const { result } = renderHook(() => useStatistics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.statistics).toEqual(zeroStatistics);
    expect(result.current.error).toBe(null);
  });

  it('should handle large numbers in statistics', async () => {
    const largeStatistics = { postsCount: 999999, quizzesCount: 100000 };
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(largeStatistics),
    });

    const { result } = renderHook(() => useStatistics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.statistics).toEqual(largeStatistics);
  });

  it('should handle error state from useErrorHandler', () => {
    const errorMessage = 'Test error message';
    mockUseErrorHandler.mockReturnValue({
      error: { message: errorMessage },
      handleError: mockHandleError,
      clearError: mockClearError,
    });

    const { result } = renderHook(() => useStatistics());

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.hasError).toBe(true);
  });

  it('should handle missing properties in response', async () => {
    const incompleteStatistics = { postsCount: 100 };
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(incompleteStatistics),
    });

    const { result } = renderHook(() => useStatistics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.statistics).toEqual(incompleteStatistics);
  });

  it('should handle null response', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(null),
    });

    const { result } = renderHook(() => useStatistics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.statistics).toBe(null);
  });

  it('should handle empty object response', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const { result } = renderHook(() => useStatistics());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.statistics).toEqual({});
  });

  it('should maintain loading state during fetch', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise(resolve => {
      resolvePromise = resolve;
    });

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => promise,
    });

    const { result } = renderHook(() => useStatistics());

    expect(result.current.loading).toBe(true);
    expect(result.current.statistics).toBe(null);

    act(() => {
      resolvePromise(mockStatistics);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.statistics).toEqual(mockStatistics);
  });
});
