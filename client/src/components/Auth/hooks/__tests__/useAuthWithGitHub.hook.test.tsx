import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useAuthWithGitHub } from '../useAuthWithGitHub.hook';

vi.mock('../../../../utils/api', () => ({
  API_BASE_URL: 'http://localhost:8080/api',
}));

const mockSetItem = vi.fn();
const mockGetItem = vi.fn();
const mockRemoveItem = vi.fn();

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: mockSetItem,
    getItem: mockGetItem,
    removeItem: mockRemoveItem,
    clear: vi.fn(),
  },
  writable: true,
});

Object.defineProperty(window, 'location', {
  value: {
    href: '',
    origin: 'http://localhost:3000',
  },
  writable: true,
});

describe('useAuthWithGitHub', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.href = '';
    mockSetItem.mockClear();
    mockGetItem.mockClear();
    mockRemoveItem.mockClear();

    vi.stubEnv('VITE_GITHUB_CLIENT_ID', 'mock-github-client-id');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useAuthWithGitHub());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(typeof result.current.handleGitHubLogin).toBe('function');
    expect(typeof result.current.clearError).toBe('function');
  });

  it('should handle GitHub login redirect', () => {
    const { result } = renderHook(() => useAuthWithGitHub());

    act(() => {
      result.current.handleGitHubLogin();
    });

    expect(mockSetItem).toHaveBeenCalledWith(
      'github_oauth_state',
      expect.any(String)
    );
    expect(window.location.href).toContain(
      'https://github.com/login/oauth/authorize'
    );
    expect(window.location.href).toContain('client_id=mock-github-client-id');
  });

  it('should handle missing GitHub Client ID', () => {
    vi.stubEnv('VITE_GITHUB_CLIENT_ID', '');

    const { result } = renderHook(() => useAuthWithGitHub());

    act(() => {
      result.current.handleGitHubLogin();
    });

    expect(result.current.error).toBe(
      'GitHub Client ID nie jest skonfigurowane. Dodaj VITE_GITHUB_CLIENT_ID do pliku .env'
    );
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle successful GitHub callback', async () => {
    const { result } = renderHook(() => useAuthWithGitHub());
    const mockCode = 'github_auth_code_123';
    const mockState = 'random_state_456';

    mockGetItem.mockReturnValue(mockState);

    await act(async () => {
      // @ts-ignore - accessing private method for testing
      await result.current.handleGitHubCallback(mockCode, mockState);
    });

    expect(mockGetItem).toHaveBeenCalledWith('github_oauth_state');
    expect(mockRemoveItem).toHaveBeenCalledWith('github_oauth_state');
    expect(mockSetItem).toHaveBeenCalledWith(
      'accessToken',
      expect.stringContaining('github_demo_token_')
    );
  });

  it('should handle invalid state (CSRF protection)', async () => {
    const { result } = renderHook(() => useAuthWithGitHub());
    const mockCode = 'github_auth_code_123';
    const receivedState = 'invalid_state';
    const savedState = 'valid_state';

    mockGetItem.mockReturnValue(savedState);

    await act(async () => {
      // @ts-ignore - accessing private method for testing
      await result.current.handleGitHubCallback(mockCode, receivedState);
    });

    expect(result.current.error).toBe(
      'Nieprawidłowy stan OAuth - możliwy atak CSRF'
    );
    expect(result.current.isLoading).toBe(false);
  });

  it('should set loading state during GitHub login', () => {
    const { result } = renderHook(() => useAuthWithGitHub());

    act(() => {
      result.current.handleGitHubLogin();
    });

    expect(mockSetItem).toHaveBeenCalled();
  });

  it('should clear error when clearError is called', () => {
    const { result } = renderHook(() => useAuthWithGitHub());

    act(() => {
      vi.stubEnv('VITE_GITHUB_CLIENT_ID', '');
      result.current.handleGitHubLogin();
    });

    expect(result.current.error).toBeTruthy();

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBe(null);
  });

  it('should generate random state for OAuth', () => {
    const { result } = renderHook(() => useAuthWithGitHub());

    act(() => {
      result.current.handleGitHubLogin();
    });

    expect(mockSetItem).toHaveBeenCalledWith(
      'github_oauth_state',
      expect.any(String)
    );

    const stateValue = mockSetItem.mock.calls.find(
      call => call[0] === 'github_oauth_state'
    )?.[1];

    expect(stateValue).toBeDefined();
    expect(typeof stateValue).toBe('string');
    expect(stateValue.length).toBeGreaterThan(10);
  });

  it('should handle callback loading state', async () => {
    const { result } = renderHook(() => useAuthWithGitHub());
    const mockCode = 'github_auth_code_123';
    const mockState = 'random_state_456';

    mockGetItem.mockReturnValue(mockState);

    const callbackPromise = act(async () => {
      // @ts-ignore - accessing private method for testing
      await result.current.handleGitHubCallback(mockCode, mockState);
    });

    await callbackPromise;

    expect(result.current.isLoading).toBe(false);
  });
});
