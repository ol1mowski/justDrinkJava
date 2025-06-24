import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import {
  useCurrentUser,
  useUpdateProfile,
  useIsAuthenticated,
} from '../useCurrentUser.hook';

vi.mock('../../../../utils/api', () => ({
  apiService: {
    getCurrentUser: vi.fn(),
    updateProfile: vi.fn(),
  },
}));

vi.mock('../../../../utils/jwt', () => ({
  getTokenFromStorage: vi.fn(),
  isTokenExpired: vi.fn(),
}));

import { apiService } from '../../../../utils/api';
import { getTokenFromStorage, isTokenExpired } from '../../../../utils/jwt';

const mockApiService = apiService as any;
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
    mockApiService.getCurrentUser.mockResolvedValue(mockUser);

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
    expect(mockApiService.getCurrentUser).toHaveBeenCalledTimes(1);
  });

  it('should not fetch when no token exists', () => {
    mockGetTokenFromStorage.mockReturnValue(null);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(mockApiService.getCurrentUser).not.toHaveBeenCalled();
  });

  it('should not fetch when token is expired', () => {
    mockIsTokenExpired.mockReturnValue(true);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(mockApiService.getCurrentUser).not.toHaveBeenCalled();
  });

  it('should handle API error', async () => {
    const error = new Error('API Error');
    mockApiService.getCurrentUser.mockRejectedValue(error);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 5000 }
    );

    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeUndefined();
  });

  it('should not retry on 401/403 errors', async () => {
    const error = new Error('403 Forbidden');
    mockApiService.getCurrentUser.mockRejectedValue(error);

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockApiService.getCurrentUser).toHaveBeenCalledTimes(1);
  });

  it('should retry on other errors', async () => {
    const error = new Error('Network error');
    mockApiService.getCurrentUser
      .mockRejectedValueOnce(error)
      .mockRejectedValueOnce(error)
      .mockResolvedValue(mockUser);

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 2,
          retryDelay: 0,
          staleTime: 0,
          gcTime: 0,
          refetchOnWindowFocus: false,
          refetchOnMount: false,
          refetchOnReconnect: false,
        },
      },
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCurrentUser(), { wrapper });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 5000 }
    );

    expect(mockApiService.getCurrentUser).toHaveBeenCalledTimes(3);
    expect(result.current.data).toEqual(mockUser);
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
    mockApiService.updateProfile.mockResolvedValue({
      user: { ...mockUser, username: 'newusername' },
      newToken: null,
    });

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

  it('should update profile successfully', async () => {
    const { result } = renderHook(() => useUpdateProfile(), {
      wrapper: createWrapper(),
    });

    const updateRequest = { username: 'newusername' };

    await waitFor(async () => {
      result.current.mutate(updateRequest);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockApiService.updateProfile).toHaveBeenCalledWith(updateRequest);
  });

  it('should handle profile update with new token', async () => {
    const newToken = 'new-jwt-token';
    mockApiService.updateProfile.mockResolvedValue({
      user: { ...mockUser, username: 'newusername' },
      newToken,
    });

    const { result } = renderHook(() => useUpdateProfile(), {
      wrapper: createWrapper(),
    });

    const updateRequest = { username: 'newusername' };

    await waitFor(async () => {
      result.current.mutate(updateRequest);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', newToken);
  });

  it('should handle profile update error', async () => {
    const error = new Error('Update failed');
    mockApiService.updateProfile.mockRejectedValue(error);

    const { result } = renderHook(() => useUpdateProfile(), {
      wrapper: createWrapper(),
    });

    const updateRequest = { username: 'newusername' };

    await waitFor(async () => {
      result.current.mutate(updateRequest);
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBe(error);
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
    mockGetTokenFromStorage.mockReturnValue('valid-token');
    mockIsTokenExpired.mockReturnValue(false);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return authenticated when user exists', async () => {
    mockApiService.getCurrentUser.mockResolvedValue(mockUser);

    const { result } = renderHook(() => useIsAuthenticated(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
  });

  it('should return not authenticated when no user', async () => {
    mockGetTokenFromStorage.mockReturnValue(null);

    const { result } = renderHook(() => useIsAuthenticated(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('should return not authenticated on error', async () => {
    mockApiService.getCurrentUser.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useIsAuthenticated(), {
      wrapper: createWrapper(),
    });

    await waitFor(
      () => {
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 5000 }
    );

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeUndefined();
  });

  it('should handle loading state', () => {
    mockApiService.getCurrentUser.mockImplementation(
      () => new Promise(() => {})
    );

    const { result } = renderHook(() => useIsAuthenticated(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isAuthenticated).toBe(false);
  });
});
