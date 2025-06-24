import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDeleteAccount } from '../useDeleteAccount.hook';

vi.mock('../../../../utils/api', () => ({
  apiService: {
    deleteAccount: vi.fn(),
  },
}));

import { apiService } from '../../../../utils/api';

const mockApiService = apiService as any;

Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

Object.defineProperty(window, 'localStorage', {
  value: {
    removeItem: vi.fn(),
  },
  writable: true,
});

describe('useDeleteAccount', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.href = '';
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should have initial state with correct default values', () => {
    const { result } = renderHook(() => useDeleteAccount());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(false);
    expect(typeof result.current.deleteAccount).toBe('function');
    expect(typeof result.current.clearState).toBe('function');
  });

  it('should handle successful account deletion', async () => {
    mockApiService.deleteAccount.mockResolvedValue({});

    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      await result.current.deleteAccount();
    });

    expect(mockApiService.deleteAccount).toHaveBeenCalledWith();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(true);

    expect(localStorage.removeItem).toHaveBeenCalledWith('accessToken');
    expect(window.location.href).toBe('/');
  });

  it('should handle API error during account deletion', async () => {
    const errorMessage = 'Nie można usunąć konta w tym momencie';
    mockApiService.deleteAccount.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      try {
        await result.current.deleteAccount();
      } catch (error) {}
    });

    expect(mockApiService.deleteAccount).toHaveBeenCalledWith();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.success).toBe(false);

    expect(localStorage.removeItem).not.toHaveBeenCalled();
    expect(window.location.href).toBe('');
  });

  it('should handle non-Error exception during account deletion', async () => {
    mockApiService.deleteAccount.mockRejectedValue('String error');

    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      try {
        await result.current.deleteAccount();
      } catch (error) {}
    });

    expect(result.current.error).toBe('Błąd podczas usuwania konta');
    expect(result.current.success).toBe(false);
  });

  it('should set loading state during account deletion', async () => {
    let resolvePromise: () => void;
    const pendingPromise = new Promise<void>(resolve => {
      resolvePromise = resolve;
    });

    mockApiService.deleteAccount.mockReturnValue(pendingPromise);

    const { result } = renderHook(() => useDeleteAccount());

    act(() => {
      result.current.deleteAccount();
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(false);

    await act(async () => {
      resolvePromise!();
      await pendingPromise;
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.success).toBe(true);
  });

  it('should clear state when clearState is called', async () => {
    mockApiService.deleteAccount.mockRejectedValue(new Error('Test error'));

    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      try {
        await result.current.deleteAccount();
      } catch (error) {
        // Expected
      }
    });

    expect(result.current.error).toBe('Test error');

    act(() => {
      result.current.clearState();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(false);
  });

  it('should reset error and success state when starting new deletion', async () => {
    const { result } = renderHook(() => useDeleteAccount());

    act(() => {
      result.current.clearState();
    });

    mockApiService.deleteAccount.mockResolvedValueOnce({});

    await act(async () => {
      await result.current.deleteAccount();
    });

    expect(result.current.success).toBe(true);

    mockApiService.deleteAccount.mockRejectedValueOnce(new Error('New error'));

    await act(async () => {
      try {
        await result.current.deleteAccount();
      } catch (error) {}
    });

    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe('New error');
  });

  it('should not remove token or redirect if deletion fails', async () => {
    mockApiService.deleteAccount.mockRejectedValue(
      new Error('Deletion failed')
    );

    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      try {
        await result.current.deleteAccount();
      } catch (error) {}
    });

    expect(localStorage.removeItem).not.toHaveBeenCalled();
    expect(window.location.href).toBe('');
  });
});
