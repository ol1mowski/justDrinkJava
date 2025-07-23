import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { usePostLike } from '../usePostLike.hook';

vi.mock('../../../../api/services.api', () => ({
  postService: {
    toggleLike: vi.fn(),
  },
}));

vi.mock('../../../../hooks/auth/useAuth.hook', () => ({
  useAuth: vi.fn(),
}));

import { postService } from '../../../../api/services.api';
import { useAuth } from '../../../../hooks/auth/useAuth.hook';

const mockPostService = postService as any;
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
    mockPostService.toggleLike.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePostLike());

    let response;
    await act(async () => {
      response = await result.current.toggleLike(123);
    });

    expect(mockPostService.toggleLike).toHaveBeenCalledWith(123);
    expect(response).toEqual(mockResponse);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle successful unlike toggle', async () => {
    const mockResponse = {
      likes: 41,
      isLikedByCurrentUser: false,
    };
    mockPostService.toggleLike.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePostLike());

    let response;
    await act(async () => {
      response = await result.current.toggleLike(123);
    });

    expect(mockPostService.toggleLike).toHaveBeenCalledWith(123);
    expect(response).toEqual(mockResponse);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle API error during like toggle', async () => {
    const errorMessage = 'Nie można polajkować posta';
    mockPostService.toggleLike.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => usePostLike());

    let response;
    await act(async () => {
      response = await result.current.toggleLike(123);
    });

    expect(mockPostService.toggleLike).toHaveBeenCalledWith(123);
    expect(response).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should handle non-Error exception during like toggle', async () => {
    mockPostService.toggleLike.mockRejectedValue('String error');

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
    const mockResponse = {
      likes: 42,
      isLikedByCurrentUser: true,
    };
    mockPostService.toggleLike.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePostLike());

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await result.current.toggleLike(123);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should clear error when clearError is called', async () => {
    mockPostService.toggleLike.mockRejectedValue(new Error('Test error'));

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
    mockPostService.toggleLike
      .mockRejectedValueOnce(new Error('First error'))
      .mockResolvedValueOnce({
        likes: 42,
        isLikedByCurrentUser: true,
      });

    const { result } = renderHook(() => usePostLike());

    await act(async () => {
      await result.current.toggleLike(123);
    });

    expect(result.current.error).toBe('First error');

    await act(async () => {
      await result.current.toggleLike(123);
    });

    expect(result.current.error).toBe(null);
  });

  it('should return null and set error when user is not authenticated', async () => {
    vi.clearAllMocks();
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
    expect(mockPostService.toggleLike).not.toHaveBeenCalled();
  });

  it('should handle multiple rapid like toggles', async () => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
    });

    const mockResponse = {
      likes: 42,
      isLikedByCurrentUser: true,
    };
    mockPostService.toggleLike.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePostLike());

    await act(async () => {
      await Promise.all([
        result.current.toggleLike(123),
        result.current.toggleLike(123),
        result.current.toggleLike(123),
      ]);
    });

    expect(mockPostService.toggleLike).toHaveBeenCalledTimes(3);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle different post IDs', async () => {
    const mockResponse1 = {
      likes: 42,
      isLikedByCurrentUser: true,
    };
    const mockResponse2 = {
      likes: 43,
      isLikedByCurrentUser: false,
    };

    mockPostService.toggleLike
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2);

    const { result } = renderHook(() => usePostLike());

    let response1, response2;
    await act(async () => {
      response1 = await result.current.toggleLike(123);
      response2 = await result.current.toggleLike(456);
    });

    expect(mockPostService.toggleLike).toHaveBeenCalledWith(123);
    expect(mockPostService.toggleLike).toHaveBeenCalledWith(456);
    expect(response1).toEqual(mockResponse1);
    expect(response2).toEqual(mockResponse2);
  });
});
