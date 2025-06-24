import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useAuthWithGoogle } from '../useAuthWithGoogle.hook';

vi.mock('../../../../utils/api', () => ({
  authApi: {
    googleAuth: vi.fn(),
  },
}));

import { authApi } from '../../../../utils/api';

const mockAuthApi = authApi as any;

Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
  writable: true,
});

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  },
  writable: true,
});

describe('useAuthWithGoogle', () => {
  const mockGoogleUser = {
    id: '12345',
    email: 'test@example.com',
    name: 'Test User',
    picture: 'https://example.com/picture.jpg',
    given_name: 'Test',
    family_name: 'User',
  };

  const mockToken = 'mock-google-token';

  beforeEach(() => {
    vi.clearAllMocks();
    window.location.href = '';
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should have initial state with correct default values', () => {
    const { result } = renderHook(() => useAuthWithGoogle());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.handleGoogleLogin).toBe('function');
    expect(typeof result.current.clearError).toBe('function');
  });

  it('should handle successful Google login', async () => {
    mockAuthApi.googleAuth.mockResolvedValue({
      status: 'success',
      data: {
        token: 'success-token',
        user: mockGoogleUser,
      },
    });

    const { result } = renderHook(() => useAuthWithGoogle());

    await act(async () => {
      await result.current.handleGoogleLogin(mockGoogleUser, mockToken);
    });

    expect(mockAuthApi.googleAuth).toHaveBeenCalledWith({
      credential: mockToken,
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      'success-token'
    );
    expect(window.location.href).toBe('/');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle API error during Google login', async () => {
    const errorMessage = 'Nieprawidłowy token Google';
    mockAuthApi.googleAuth.mockResolvedValue({
      status: 'error',
      message: errorMessage,
    });

    const { result } = renderHook(() => useAuthWithGoogle());

    await act(async () => {
      await result.current.handleGoogleLogin(mockGoogleUser, mockToken);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(window.location.href).toBe('');
  });

  it('should handle network error during Google login', async () => {
    const networkError = new Error('Network error');
    mockAuthApi.googleAuth.mockRejectedValue(networkError);

    const { result } = renderHook(() => useAuthWithGoogle());

    await act(async () => {
      await result.current.handleGoogleLogin(mockGoogleUser, mockToken);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Network error');
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should set loading state during Google login', async () => {
    let resolvePromise: (value: any) => void;
    const pendingPromise = new Promise(resolve => {
      resolvePromise = resolve;
    });

    mockAuthApi.googleAuth.mockReturnValue(pendingPromise);

    const { result } = renderHook(() => useAuthWithGoogle());

    act(() => {
      result.current.handleGoogleLogin(mockGoogleUser, mockToken);
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);

    await act(async () => {
      resolvePromise!({ status: 'success', data: { token: 'test-token' } });
      await pendingPromise;
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should clear error when clearError is called', () => {
    const { result } = renderHook(() => useAuthWithGoogle());

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBe(null);
  });

  it('should handle response without data', async () => {
    mockAuthApi.googleAuth.mockResolvedValue({
      status: 'success',
      data: null,
    });

    const { result } = renderHook(() => useAuthWithGoogle());

    await act(async () => {
      await result.current.handleGoogleLogin(mockGoogleUser, mockToken);
    });

    expect(result.current.error).toBe('Błąd podczas logowania przez Google');
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should handle non-Error exception', async () => {
    mockAuthApi.googleAuth.mockRejectedValue('String error');

    const { result } = renderHook(() => useAuthWithGoogle());

    await act(async () => {
      await result.current.handleGoogleLogin(mockGoogleUser, mockToken);
    });

    expect(result.current.error).toBe(
      'Wystąpił błąd podczas logowania przez Google'
    );
  });
});
