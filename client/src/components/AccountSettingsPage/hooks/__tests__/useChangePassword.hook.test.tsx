import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useChangePassword } from '../useChangePassword.hook';

vi.mock('../../../../api/services.api', () => ({
  userService: {
    changePassword: vi.fn(),
  },
}));

import { userService } from '../../../../api/services.api';

const mockUserService = userService as any;

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
    mockUserService.changePassword.mockResolvedValue({});

    const { result } = renderHook(() => useChangePassword());

    const request = {
      currentPassword: 'oldPassword123',
      newPassword: 'newPassword123',
      confirmPassword: 'newPassword123',
    };

    await act(async () => {
      await result.current.changePassword(request);
    });

    expect(mockUserService.changePassword).toHaveBeenCalledWith(request);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(true);
  });

  it('should handle API error during password change', async () => {
    const errorMessage = 'Aktualne hasło jest nieprawidłowe';
    mockUserService.changePassword.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useChangePassword());

    const request = {
      currentPassword: 'wrongPassword',
      newPassword: 'newPassword123',
      confirmPassword: 'newPassword123',
    };

    await act(async () => {
      try {
        await result.current.changePassword(request);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(mockUserService.changePassword).toHaveBeenCalledWith(request);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.success).toBe(false);
  });

  it('should handle non-Error exception during password change', async () => {
    mockUserService.changePassword.mockRejectedValue('String error');

    const { result } = renderHook(() => useChangePassword());

    const request = {
      currentPassword: 'oldPassword123',
      newPassword: 'newPassword123',
      confirmPassword: 'newPassword123',
    };

    await act(async () => {
      try {
        await result.current.changePassword(request);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('Błąd podczas zmiany hasła');
    expect(result.current.success).toBe(false);
  });

  it('should set loading state during password change', async () => {
    const mockResponse = {};
    mockUserService.changePassword.mockResolvedValue(mockResponse);

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

    await act(async () => {
      await result.current.changePassword(request);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.success).toBe(true);
  });

  it('should clear state when clearState is called', async () => {
    mockUserService.changePassword.mockRejectedValue(new Error('Test error'));

    const { result } = renderHook(() => useChangePassword());

    const request = {
      currentPassword: 'oldPassword123',
      newPassword: 'newPassword123',
      confirmPassword: 'newPassword123',
    };

    await act(async () => {
      try {
        await result.current.changePassword(request);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('Test error');

    act(() => {
      result.current.clearState();
    });

    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(false);
  });

  it('should reset error and success state when starting new password change', async () => {
    mockUserService.changePassword
      .mockRejectedValueOnce(new Error('First error'))
      .mockResolvedValueOnce({});

    const { result } = renderHook(() => useChangePassword());

    const request = {
      currentPassword: 'oldPassword123',
      newPassword: 'newPassword123',
      confirmPassword: 'newPassword123',
    };

    await act(async () => {
      try {
        await result.current.changePassword(request);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.error).toBe('First error');
    expect(result.current.success).toBe(false);

    await act(async () => {
      await result.current.changePassword(request);
    });

    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe(true);
  });
});
