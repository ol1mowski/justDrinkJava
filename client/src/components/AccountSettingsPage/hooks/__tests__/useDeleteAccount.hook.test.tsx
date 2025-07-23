import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDeleteAccount } from '../useDeleteAccount.hook';

vi.mock('../../../../api/services.api', () => ({
  userService: {
    deleteAccount: vi.fn(),
  },
}));

import { userService } from '../../../../api/services.api';

const mockUserService = userService as any;

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
    mockUserService.deleteAccount.mockResolvedValue({});

    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      await result.current.deleteAccount();
    });

    expect(mockUserService.deleteAccount).toHaveBeenCalledWith();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(true);

    expect(localStorage.removeItem).toHaveBeenCalledWith('accessToken');
    expect(window.location.href).toBe('/');
  });

  it('should handle API error during account deletion', async () => {
    const errorMessage = 'Nie można usunąć konta';
    mockUserService.deleteAccount.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      try {
        await result.current.deleteAccount();
      } catch (error) {}
    });

    expect(mockUserService.deleteAccount).toHaveBeenCalledWith();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.success).toBe(false);

    expect(localStorage.removeItem).not.toHaveBeenCalled();
    expect(window.location.href).toBe('');
  });

  it('should handle non-Error exception during account deletion', async () => {
    mockUserService.deleteAccount.mockRejectedValue('String error');

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

    mockUserService.deleteAccount.mockReturnValue(pendingPromise);

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
    mockUserService.deleteAccount.mockRejectedValue(new Error('Test error'));

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
    mockUserService.deleteAccount
      .mockRejectedValueOnce(new Error('First error'))
      .mockResolvedValueOnce({});

    const { result } = renderHook(() => useDeleteAccount());

    await act(async () => {
      try {
        await result.current.deleteAccount();
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('First error');
    expect(result.current.success).toBe(false);

    await act(async () => {
      await result.current.deleteAccount();
    });

    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(true);
  });

  it('should not remove token or redirect if deletion fails', async () => {
    mockUserService.deleteAccount.mockRejectedValue(
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
