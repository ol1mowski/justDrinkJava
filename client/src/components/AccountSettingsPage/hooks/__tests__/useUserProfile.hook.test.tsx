import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useUserProfile } from '../useUserProfile.hook';

vi.mock('../../../Header/hooks/useCurrentUser.hook', () => ({
  useCurrentUser: vi.fn(),
  useUpdateProfile: vi.fn(),
}));

import {
  useCurrentUser,
  useUpdateProfile,
} from '../../../Header/hooks/useCurrentUser.hook';

const mockUseCurrentUser = useCurrentUser as any;
const mockUseUpdateProfile = useUpdateProfile as any;

describe('useUserProfile', () => {
  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    createdAt: '2024-01-01T00:00:00Z',
  };

  const mockRefetch = vi.fn();
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseCurrentUser.mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null,
      refetch: mockRefetch,
    });

    mockUseUpdateProfile.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return user data and functions', () => {
    const { result } = renderHook(() => useUserProfile());

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.updateProfile).toBe('function');
    expect(typeof result.current.refetch).toBe('function');
  });

  it('should handle loading state from useCurrentUser', () => {
    mockUseCurrentUser.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: mockRefetch,
    });

    const { result } = renderHook(() => useUserProfile());

    expect(result.current.user).toBe(null);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('should handle loading state from useUpdateProfile', () => {
    mockUseUpdateProfile.mockReturnValue({
      mutate: mockMutate,
      isPending: true,
      error: null,
    });

    const { result } = renderHook(() => useUserProfile());

    expect(result.current.isLoading).toBe(true);
  });

  it('should handle combined loading state', () => {
    mockUseCurrentUser.mockReturnValue({
      data: mockUser,
      isLoading: true,
      error: null,
      refetch: mockRefetch,
    });

    mockUseUpdateProfile.mockReturnValue({
      mutate: mockMutate,
      isPending: true,
      error: null,
    });

    const { result } = renderHook(() => useUserProfile());

    expect(result.current.isLoading).toBe(true);
  });

  it('should handle error from useCurrentUser', () => {
    const error = new Error('Failed to fetch user');
    mockUseCurrentUser.mockReturnValue({
      data: null,
      isLoading: false,
      error: error,
      refetch: mockRefetch,
    });

    const { result } = renderHook(() => useUserProfile());

    expect(result.current.error).toBe('Failed to fetch user');
    expect(result.current.user).toBe(null);
  });

  it('should handle error from useUpdateProfile', () => {
    const error = new Error('Failed to update profile');
    mockUseUpdateProfile.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: error,
    });

    const { result } = renderHook(() => useUserProfile());

    expect(result.current.error).toBe('Failed to update profile');
  });

  it('should prioritize useCurrentUser error over useUpdateProfile error', () => {
    const userError = new Error('User fetch error');
    const updateError = new Error('Update error');

    mockUseCurrentUser.mockReturnValue({
      data: null,
      isLoading: false,
      error: userError,
      refetch: mockRefetch,
    });

    mockUseUpdateProfile.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: updateError,
    });

    const { result } = renderHook(() => useUserProfile());

    expect(result.current.error).toBe('User fetch error');
  });

  it('should call updateProfile mutation with success callback', async () => {
    const { result } = renderHook(() => useUserProfile());

    const updateRequest = { username: 'newusername' };

    mockMutate.mockImplementation((_request, options) => {
      options.onSuccess();
    });

    await act(async () => {
      await result.current.updateProfile(updateRequest);
    });

    expect(mockMutate).toHaveBeenCalledWith(
      updateRequest,
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      })
    );
  });

  it('should call updateProfile mutation with error callback', async () => {
    const { result } = renderHook(() => useUserProfile());

    const updateRequest = { username: 'newusername' };
    const updateError = new Error('Update failed');

    mockMutate.mockImplementation((_request, options) => {
      options.onError(updateError);
    });

    await act(async () => {
      try {
        await result.current.updateProfile(updateRequest);
      } catch (error) {
        expect(error).toBe(updateError);
      }
    });

    expect(mockMutate).toHaveBeenCalledWith(
      updateRequest,
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      })
    );
  });

  it('should call refetch function', () => {
    const { result } = renderHook(() => useUserProfile());

    act(() => {
      result.current.refetch();
    });

    expect(mockRefetch).toHaveBeenCalled();
  });

  it('should return null user when no data available', () => {
    mockUseCurrentUser.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
      refetch: mockRefetch,
    });

    const { result } = renderHook(() => useUserProfile());

    expect(result.current.user).toBe(null);
  });

  it('should handle updateProfile promise resolution', async () => {
    const { result } = renderHook(() => useUserProfile());

    mockMutate.mockImplementation((_request, options) => {
      setTimeout(() => options.onSuccess(), 0);
    });

    const updateRequest = { username: 'newusername' };

    await act(async () => {
      const promise = result.current.updateProfile(updateRequest);
      await expect(promise).resolves.toBeUndefined();
    });
  });

  it('should handle updateProfile promise rejection', async () => {
    const { result } = renderHook(() => useUserProfile());

    const error = new Error('Update failed');
    mockMutate.mockImplementation((_request, options) => {
      setTimeout(() => options.onError(error), 0);
    });

    const updateRequest = { username: 'newusername' };

    await act(async () => {
      const promise = result.current.updateProfile(updateRequest);
      await expect(promise).rejects.toBe(error);
    });
  });
});
