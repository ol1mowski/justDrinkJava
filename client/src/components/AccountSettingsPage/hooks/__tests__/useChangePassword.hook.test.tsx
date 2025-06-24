import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useChangePassword } from '../useChangePassword.hook';

vi.mock('../../../../utils/api', () => ({
  apiService: {
    changePassword: vi.fn(),
  },
}));

import { apiService } from '../../../../utils/api';

const mockApiService = apiService as any;

describe('useChangePassword', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should have initial state with correct default values', () => {
    const { result } = renderHook(() => useChangePassword());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(false);
    expect(typeof result.current.changePassword).toBe('function');
    expect(typeof result.current.clearState).toBe('function');
  });

  it('should handle successful password change', async () => {
    mockApiService.changePassword.mockResolvedValue({});

    const { result } = renderHook(() => useChangePassword());

    const request = {
      currentPassword: 'oldPassword123',
      newPassword: 'newPassword123',
      confirmPassword: 'newPassword123',
    };

    await act(async () => {
      await result.current.changePassword(request);
    });

    expect(mockApiService.changePassword).toHaveBeenCalledWith(request);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(true);
  });

  it('should handle API error during password change', async () => {
    const errorMessage = 'Aktualne hasło jest nieprawidłowe';
    mockApiService.changePassword.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useChangePassword());

    const request = {
      currentPassword: 'wrongPassword',
      newPassword: 'newPassword123',
      confirmPassword: 'newPassword123',
    };

    await act(async () => {
      try {
        await result.current.changePassword(request);
      } catch (error) {}
    });

    expect(mockApiService.changePassword).toHaveBeenCalledWith(request);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.success).toBe(false);
  });

  it('should handle non-Error exception during password change', async () => {
    mockApiService.changePassword.mockRejectedValue('String error');

    const { result } = renderHook(() => useChangePassword());

    const request = {
      currentPassword: 'oldPassword123',
      newPassword: 'newPassword123',
      confirmPassword: 'newPassword123',
    };

    await act(async () => {
      try {
        await result.current.changePassword(request);
      } catch (error) {}
    });

    expect(result.current.error).toBe('Błąd podczas zmiany hasła');
    expect(result.current.success).toBe(false);
  });

  it('should set loading state during password change', async () => {
    let resolvePromise: () => void;
    const pendingPromise = new Promise<void>(resolve => {
      resolvePromise = resolve;
    });

    mockApiService.changePassword.mockReturnValue(pendingPromise);

    const { result } = renderHook(() => useChangePassword());

    const request = {
      currentPassword: 'oldPassword123',
      newPassword: 'newPassword123',
      confirmPassword: 'newPassword123',
    };

    act(() => {
      result.current.changePassword(request);
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
    mockApiService.changePassword.mockRejectedValue(new Error('Test error'));

    const { result } = renderHook(() => useChangePassword());

    await act(async () => {
      try {
        await result.current.changePassword({
          currentPassword: 'test',
          newPassword: 'test',
          confirmPassword: 'test',
        });
      } catch (error) {}
    });

    expect(result.current.error).toBe('Test error');

    act(() => {
      result.current.clearState();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(false);
  });

  it('should reset error and success state when starting new password change', async () => {
    const { result } = renderHook(() => useChangePassword());

    act(() => {
      result.current.clearState();
    });

    mockApiService.changePassword.mockResolvedValueOnce({});

    await act(async () => {
      await result.current.changePassword({
        currentPassword: 'test',
        newPassword: 'test',
        confirmPassword: 'test',
      });
    });

    expect(result.current.success).toBe(true);

    mockApiService.changePassword.mockRejectedValueOnce(new Error('New error'));

    await act(async () => {
      try {
        await result.current.changePassword({
          currentPassword: 'test2',
          newPassword: 'test2',
          confirmPassword: 'test2',
        });
      } catch (error) {}
    });

    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe('New error');
  });
});
