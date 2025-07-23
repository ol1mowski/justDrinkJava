import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuthActions } from '../useAuthActions.hook';

// Mock authApi
vi.mock('../../../api', () => ({
  authApi: {
    login: vi.fn(),
    register: vi.fn(),
  },
}));

// Mock JWT utils
vi.mock('../../../utils/jwt', () => ({
  getUserFromToken: vi.fn(),
}));

import { authApi } from '../../../api';
import { getUserFromToken } from '../../../utils/jwt';

const mockAuthApi = authApi as any;
const mockGetUserFromToken = getUserFromToken as any;

describe('useAuthActions', () => {
  const mockCallbacks = {
    onLoginStart: vi.fn(),
    onLoginSuccess: vi.fn(),
    onLoginError: vi.fn(),
    onRegisterStart: vi.fn(),
    onRegisterSuccess: vi.fn(),
    onRegisterError: vi.fn(),
    onLogout: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetUserFromToken.mockReturnValue({
      email: 'test@example.com',
      username: 'testuser',
    });
  });

  it('should call onLoginSuccess when login is successful', async () => {
    const mockToken = 'test-token';
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      username: 'testuser',
      createdAt: '2024-01-01T00:00:00Z',
    };

    mockAuthApi.login.mockResolvedValue({
      status: 'success',
      data: {
        token: mockToken,
        user: mockUser,
      },
    });

    const { result } = renderHook(() => useAuthActions(mockCallbacks));

    let loginResult: any;
    await act(async () => {
      loginResult = await result.current.login({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    // Sprawdź czy callback onLoginStart został wywołany
    expect(mockCallbacks.onLoginStart).toHaveBeenCalled();

    // Sprawdź czy API zostało wywołane
    expect(mockAuthApi.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });

    // Sprawdź czy getUserFromToken zostało wywołane
    expect(mockGetUserFromToken).toHaveBeenCalledWith(mockToken);

    // Sprawdź czy callback onLoginSuccess został wywołany z prawidłowymi danymi
    expect(mockCallbacks.onLoginSuccess).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        createdAt: '2024-01-01T00:00:00Z',
      }),
      mockToken
    );

    // Sprawdź czy funkcja zwróciła success
    expect(loginResult.success).toBe(true);
  });

  it('should call onLoginError when login fails', async () => {
    const errorMessage = 'Invalid credentials';

    mockAuthApi.login.mockResolvedValue({
      status: 'error',
      message: errorMessage,
    });

    const { result } = renderHook(() => useAuthActions(mockCallbacks));

    let loginResult: any;
    await act(async () => {
      loginResult = await result.current.login({
        email: 'test@example.com',
        password: 'wrongpassword',
      });
    });

    // Sprawdź czy callback onLoginError został wywołany
    expect(mockCallbacks.onLoginError).toHaveBeenCalledWith(errorMessage);

    // Sprawdź czy onLoginSuccess NIE został wywołany
    expect(mockCallbacks.onLoginSuccess).not.toHaveBeenCalled();

    // Sprawdź czy funkcja zwróciła error
    expect(loginResult.success).toBe(false);
    expect(loginResult.error).toBe(errorMessage);
  });

  it('should call onRegisterSuccess when registration is successful', async () => {
    const mockToken = 'test-token';
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      username: 'testuser',
      createdAt: '2024-01-01T00:00:00Z',
    };

    mockAuthApi.register.mockResolvedValue({
      status: 'success',
      data: {
        token: mockToken,
        user: mockUser,
      },
    });

    const { result } = renderHook(() => useAuthActions(mockCallbacks));

    let registerResult: any;
    await act(async () => {
      registerResult = await result.current.register({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });
    });

    // Sprawdź czy callback onRegisterSuccess został wywołany
    expect(mockCallbacks.onRegisterSuccess).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        createdAt: '2024-01-01T00:00:00Z',
      }),
      mockToken
    );

    // Sprawdź czy funkcja zwróciła success
    expect(registerResult.success).toBe(true);
  });
});
