import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useAuthMain } from '../useAuthMain.hook';
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../../api', () => ({
  authApi: {
    login: vi.fn(),
    register: vi.fn(),
  },
}));

vi.mock('../../../utils/jwt', () => ({
  getTokenFromStorage: vi.fn(),
  setTokenToStorage: vi.fn(),
  removeTokenFromStorage: vi.fn(),
  isTokenExpired: vi.fn(),
  getUserFromToken: vi.fn(),
}));

vi.mock('../../../api/services.api', () => ({
  userService: {
    getCurrent: vi.fn(),
  },
  authService: {
    logout: vi.fn(),
  },
}));

vi.mock('../../../utils/api', () => ({
  userService: {
    getCurrent: vi.fn(),
  },
}));

import { authApi } from '../../../api';
import { userService } from '../../../api/services.api';
import {
  getTokenFromStorage,
  setTokenToStorage,
  removeTokenFromStorage,
  isTokenExpired,
  getUserFromToken,
} from '../../../utils/jwt';

const mockAuthApi = authApi as any;
const mockUserService = userService as any;
const mockGetTokenFromStorage = getTokenFromStorage as any;
const mockSetTokenToStorage = setTokenToStorage as any;
const mockRemoveTokenFromStorage = removeTokenFromStorage as any;
const mockIsTokenExpired = isTokenExpired as any;
const mockGetUserFromToken = getUserFromToken as any;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('useAuthMain', () => {
  const mockUser = {
    id: 1,
    email: 'test@example.com',
    username: 'testuser',
    createdAt: '2024-01-01T00:00:00Z',
  };

  const mockToken = 'mock-jwt-token';

  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });

    mockGetTokenFromStorage.mockReturnValue(null);
    mockIsTokenExpired.mockReturnValue(false);
    mockGetUserFromToken.mockReturnValue({
      email: 'test@example.com',
      username: 'testuser',
    });
    mockUserService.getCurrent.mockResolvedValue(mockUser);
    mockSetTokenToStorage.mockImplementation(() => {});
    mockRemoveTokenFromStorage.mockImplementation(() => {});
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useAuthMain(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle successful login', async () => {
    const mockResponse = {
      status: 'success',
      data: {
        token: mockToken,
        type: 'Bearer',
        user: {
          id: 1,
          email: 'test@example.com',
          username: 'testuser',
          createdAt: '2024-01-01T00:00:00Z',
        },
      },
    };

    mockAuthApi.login.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuthMain(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);

    let loginResult: any;
    await act(async () => {
      loginResult = await result.current.login({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    expect(loginResult.success).toBe(true);

    expect(mockAuthApi.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(mockSetTokenToStorage).toHaveBeenCalledWith(mockToken);

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle login error', async () => {
    const errorMessage = 'Invalid credentials';

    mockAuthApi.login.mockResolvedValue({
      status: 'error',
      message: errorMessage,
    });

    const { result } = renderHook(() => useAuthMain(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'wrongpassword',
      });
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBe(null);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(errorMessage);
    });
  });

  it('should handle successful registration', async () => {
    mockAuthApi.register.mockResolvedValue({
      status: 'success',
      data: {
        token: mockToken,
        type: 'Bearer',
        user: {
          id: 1,
          email: 'test@example.com',
          username: 'testuser',
          createdAt: '2024-01-01T00:00:00Z',
        },
      },
    });

    const { result } = renderHook(() => useAuthMain(), {
      wrapper: createWrapper(),
    });

    let registerResult: any;
    await act(async () => {
      registerResult = await result.current.register({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });
    });

    expect(registerResult.success).toBe(true);

    expect(mockSetTokenToStorage).toHaveBeenCalledWith(mockToken);
  });

  it('should handle logout', async () => {
    // Najpierw zaloguj użytkownika
    mockAuthApi.login.mockResolvedValue({
      status: 'success',
      data: {
        token: mockToken,
        type: 'Bearer',
        user: mockUser,
      },
    });

    const { result } = renderHook(() => useAuthMain(), {
      wrapper: createWrapper(),
    });

    // Zaloguj użytkownika
    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    // Wyloguj użytkownika
    act(() => {
      result.current.logout();
    });

    // Sprawdź czy użytkownik został wylogowany
    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBe(null);
    });

    expect(mockRemoveTokenFromStorage).toHaveBeenCalled();
  }, 15000);

  it('should clear error when clearError is called', () => {
    const { result } = renderHook(() => useAuthMain(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBe(null);
  });

  it('should restore authentication state from localStorage on mount', async () => {
    mockGetTokenFromStorage.mockReturnValue(mockToken);
    mockIsTokenExpired.mockReturnValue(false);
    mockUserService.getCurrent.mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuthMain(), {
      wrapper: createWrapper(),
    });

    // Poczekaj na inicjalizację
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 5000 }
    );
  });
});
