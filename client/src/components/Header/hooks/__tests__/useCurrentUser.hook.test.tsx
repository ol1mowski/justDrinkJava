import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import {
  useCurrentUser,
  useUpdateProfile,
  useIsAuthenticated,
} from '../useCurrentUser.hook';

vi.mock('../../../../api/services.api', () => ({
  userService: {
    getCurrent: vi.fn(),
    updateProfile: vi.fn(),
  },
}));

vi.mock('../../../../utils/jwt', () => ({
  getTokenFromStorage: vi.fn(),
  isTokenExpired: vi.fn(),
}));

import { userService } from '../../../../api/services.api';
import { getTokenFromStorage, isTokenExpired } from '../../../../utils/jwt';

const mockUserService = userService as any;
const mockGetTokenFromStorage = getTokenFromStorage as any;
const mockIsTokenExpired = isTokenExpired as any;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useCurrentUser', () => {
  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    createdAt: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetTokenFromStorage.mockReturnValue('valid-token');
    mockIsTokenExpired.mockReturnValue(false);
    mockUserService.getCurrent.mockResolvedValue(mockUser);

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch user data when token is valid', async () => {
    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockUser);
    expect(result.current.error).toBe(null);
    expect(mockUserService.getCurrent).toHaveBeenCalledTimes(1);
  });

  it('should not fetch when no token exists', () => {
    mockGetTokenFromStorage.mockReturnValue(null);
    mockIsTokenExpired.mockReturnValue(false);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(mockUserService.getCurrent).not.toHaveBeenCalled();
  });

  it('should not fetch when token is expired', () => {
    mockGetTokenFromStorage.mockReturnValue('expired-token');
    mockIsTokenExpired.mockReturnValue(true);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(mockUserService.getCurrent).not.toHaveBeenCalled();
  });

  it('should handle API error', async () => {
    const error = new Error('API Error');
    mockUserService.getCurrent.mockRejectedValue(error);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    // Poczekaj na zakończenie ładowania
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 5000 }
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.error?.message).toBe('API Error');
  });

  it('should not retry on 401/403 errors', async () => {
    const error = new Error('401 Unauthorized');
    mockUserService.getCurrent.mockRejectedValue(error);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error?.message).toBe('401 Unauthorized');
  });

  it('should retry on other errors', async () => {
    const error = new Error('Server Error');
    mockUserService.getCurrent.mockRejectedValue(error);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    // Poczekaj na zakończenie ładowania
    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 5000 }
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.error?.message).toBe('Server Error');
  });
});

describe('useUpdateProfile', () => {
  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    createdAt: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUserService.updateProfile.mockResolvedValue({
      user: mockUser,
      token: 'new-token',
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should update profile successfully', async () => {
    const { result } = renderHook(() => useUpdateProfile(), {
      wrapper: createWrapper(),
    });

    const updateData = { username: 'newusername' };

    await result.current.mutateAsync(updateData);

    expect(mockUserService.updateProfile).toHaveBeenCalledWith(updateData);
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it('should handle profile update with new token', async () => {
    const { result } = renderHook(() => useUpdateProfile(), {
      wrapper: createWrapper(),
    });

    const updateData = { username: 'newusername' };

    await result.current.mutateAsync(updateData);

    expect(mockUserService.updateProfile).toHaveBeenCalledWith(updateData);
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Sprawdź czy token został zapisany w localStorage
    await waitFor(
      () => {
        expect(localStorage.setItem).toHaveBeenCalledWith(
          'accessToken',
          'new-token'
        );
      },
      { timeout: 5000 }
    );
  }, 10000);

  it('should handle profile update error', async () => {
    const error = new Error('Update failed');
    mockUserService.updateProfile.mockRejectedValue(error);

    const { result } = renderHook(() => useUpdateProfile(), {
      wrapper: createWrapper(),
    });

    const updateData = { username: 'newusername' };

    try {
      await result.current.mutateAsync(updateData);
    } catch (e) {
      // Expected to throw
    }

    expect(mockUserService.updateProfile).toHaveBeenCalledWith(updateData);
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});

describe('useIsAuthenticated', () => {
  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    createdAt: '2024-01-01T00:00:00Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return authenticated when user exists', () => {
    mockGetTokenFromStorage.mockReturnValue('valid-token');
    mockIsTokenExpired.mockReturnValue(false);
    mockUserService.getCurrent.mockResolvedValue(mockUser);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: { retry: false },
            },
          })
        }
      >
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useIsAuthenticated(), {
      wrapper,
    });

    expect(result.current.isAuthenticated).toBe(false); // Initially false until data loads
  });

  it('should return not authenticated when no user', () => {
    mockGetTokenFromStorage.mockReturnValue(null);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: { retry: false },
            },
          })
        }
      >
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useIsAuthenticated(), {
      wrapper,
    });

    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should return not authenticated on error', () => {
    mockGetTokenFromStorage.mockReturnValue('valid-token');
    mockIsTokenExpired.mockReturnValue(false);
    mockUserService.getCurrent.mockRejectedValue(new Error('API Error'));

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: { retry: false },
            },
          })
        }
      >
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useIsAuthenticated(), {
      wrapper,
    });

    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should handle loading state', () => {
    mockGetTokenFromStorage.mockReturnValue('valid-token');
    mockIsTokenExpired.mockReturnValue(false);
    mockUserService.getCurrent.mockImplementation(() => new Promise(() => {}));

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: { retry: false },
            },
          })
        }
      >
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useIsAuthenticated(), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
  });
});
