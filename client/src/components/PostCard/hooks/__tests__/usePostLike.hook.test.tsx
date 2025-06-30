import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { usePostLike } from '../usePostLike.hook';

vi.mock('../../../../utils/api', () => ({
  apiService: {
    togglePostLike: vi.fn(),
  },
}));

vi.mock('../../../../hooks/auth/useAuth.hook', () => ({
  useAuth: vi.fn(),
}));

import { apiService } from '../../../../utils/api';
import { useAuth } from '../../../../hooks/auth/useAuth.hook';

const mockApiService = apiService as any;
const mockUseAuth = useAuth as any;

describe('usePostLike', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should have initial state with correct default values', () => {
    const { result } = renderHook(() => usePostLike());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.toggleLike).toBe('function');
    expect(typeof result.current.clearError).toBe('function');
  });

  it('should handle successful like toggle', async () => {
    const mockResponse = {
      likes: 42,
      isLikedByCurrentUser: true,
    };
    mockApiService.togglePostLike.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePostLike());

    let response;
    await act(async () => {
      response = await result.current.toggleLike(123);
    });

    expect(mockApiService.togglePostLike).toHaveBeenCalledWith(123);
    expect(response).toEqual(mockResponse);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle successful unlike toggle', async () => {
    const mockResponse = {
      likes: 41,
      isLikedByCurrentUser: false,
    };
    mockApiService.togglePostLike.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePostLike());

    let response;
    await act(async () => {
      response = await result.current.toggleLike(123);
    });

    expect(mockApiService.togglePostLike).toHaveBeenCalledWith(123);
    expect(response).toEqual(mockResponse);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle API error during like toggle', async () => {
    const errorMessage = 'Nie można polajkować posta';
    mockApiService.togglePostLike.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => usePostLike());

    let response;
    await act(async () => {
      response = await result.current.toggleLike(123);
    });

    expect(mockApiService.togglePostLike).toHaveBeenCalledWith(123);
    expect(response).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should handle non-Error exception during like toggle', async () => {
    mockApiService.togglePostLike.mockRejectedValue('String error');

    const { result } = renderHook(() => usePostLike());

    let response;
    await act(async () => {
      response = await result.current.toggleLike(123);
    });

    expect(response).toBe(null);
    expect(result.current.error).toBe(
      'Wystąpił błąd podczas aktualizacji like'
    );
    expect(result.current.isLoading).toBe(false);
  });

  it('should set loading state during like toggle', async () => {
    let resolvePromise: (value: any) => void;
    const pendingPromise = new Promise<any>(resolve => {
      resolvePromise = resolve;
    });

    mockApiService.togglePostLike.mockReturnValue(pendingPromise);

    const { result } = renderHook(() => usePostLike());

    act(() => {
      result.current.toggleLike(123);
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);

    await act(async () => {
      resolvePromise!({ likes: 42, isLikedByCurrentUser: true });
      await pendingPromise;
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should clear error when clearError is called', async () => {
    mockApiService.togglePostLike.mockRejectedValue(new Error('Test error'));

    const { result } = renderHook(() => usePostLike());

    await act(async () => {
      await result.current.toggleLike(123);
    });

    expect(result.current.error).toBe('Test error');

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBe(null);
  });

  it('should clear error when starting new like toggle', async () => {
    const { result } = renderHook(() => usePostLike());

    mockApiService.togglePostLike.mockRejectedValueOnce(
      new Error('First error')
    );

    await act(async () => {
      await result.current.toggleLike(123);
    });

    expect(result.current.error).toBe('First error');

    mockApiService.togglePostLike.mockResolvedValueOnce({
      likes: 42,
      isLikedByCurrentUser: true,
    });

    await act(async () => {
      await result.current.toggleLike(456);
    });

    expect(result.current.error).toBe(null);
  });

  it('should return null and set error when user is not authenticated', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
    });

    const { result } = renderHook(() => usePostLike());

    let response;
    await act(async () => {
      response = await result.current.toggleLike(123);
    });

    expect(response).toBe(null);
    expect(result.current.error).toBe(
      'Musisz być zalogowany aby polajkować post'
    );
    expect(mockApiService.togglePostLike).not.toHaveBeenCalled();
  });

  it('should handle multiple rapid like toggles', async () => {
    const mockResponse = {
      likes: 42,
      isLikedByCurrentUser: true,
    };
    mockApiService.togglePostLike.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePostLike());

    await act(async () => {
      await result.current.toggleLike(123);
    });

    expect(mockApiService.togglePostLike).toHaveBeenCalledTimes(1);
    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await result.current.toggleLike(123);
    });

    expect(mockApiService.togglePostLike).toHaveBeenCalledTimes(2);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle different post IDs', async () => {
    const mockResponse1 = {
      likes: 42,
      isLikedByCurrentUser: true,
    };
    const mockResponse2 = {
      likes: 15,
      isLikedByCurrentUser: false,
    };

    mockApiService.togglePostLike
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2);

    const { result } = renderHook(() => usePostLike());

    let response1, response2;
    await act(async () => {
      response1 = await result.current.toggleLike(123);
    });

    await act(async () => {
      response2 = await result.current.toggleLike(456);
    });

    expect(mockApiService.togglePostLike).toHaveBeenCalledWith(123);
    expect(mockApiService.togglePostLike).toHaveBeenCalledWith(456);
    expect(response1).toEqual(mockResponse1);
    expect(response2).toEqual(mockResponse2);
  });
});
