import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useGoogleAuth } from '../useGoogleAuth.hook';

Object.defineProperty(global, 'atob', {
  value: vi.fn((str: string) => {
    if (str.includes('eyJ')) {
      return JSON.stringify({
        sub: '123456789',
        email: 'test@example.com',
        name: 'Test User',
        picture: 'https://example.com/avatar.jpg',
        given_name: 'Test',
        family_name: 'User',
      });
    }
    return Buffer.from(str, 'base64').toString('binary');
  }),
  writable: true,
});

const mockInitialize = vi.fn();
const mockRenderButton = vi.fn();
const mockPrompt = vi.fn();
const mockCancel = vi.fn();

const mockGoogle = {
  accounts: {
    id: {
      initialize: mockInitialize,
      renderButton: mockRenderButton,
      prompt: mockPrompt,
      cancel: mockCancel,
    },
  },
};

Object.defineProperty(window, 'google', {
  value: mockGoogle,
  writable: true,
});

describe('useGoogleAuth', () => {
  const mockOnSuccess = vi.fn();
  const mockOnError = vi.fn();

  let capturedCallback: ((response: any) => void) | null = null;

  beforeEach(() => {
    vi.clearAllMocks();
    capturedCallback = null;

    // Mock environment variable for each test
    vi.stubEnv('VITE_GOOGLE_CLIENT_ID', 'mock-google-client-id');

    mockInitialize.mockImplementation((config: any) => {
      capturedCallback = config.callback;
    });

    mockRenderButton.mockImplementation(() => {});
    mockPrompt.mockImplementation(() => {});
    mockCancel.mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() =>
      useGoogleAuth({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
      })
    );

    expect(result.current.buttonRef.current).toBe(null);
    expect(typeof result.current.isGoogleLoaded).toBe('function');
    expect(typeof result.current.initializeGoogleAuth).toBe('function');
    expect(typeof result.current.renderGoogleButton).toBe('function');
    expect(typeof result.current.promptGoogleOneTap).toBe('function');
    expect(typeof result.current.cancelGoogleOneTap).toBe('function');
  });

  it('should check if Google is loaded', () => {
    const { result } = renderHook(() =>
      useGoogleAuth({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
      })
    );

    const isLoaded = result.current.isGoogleLoaded();
    expect(isLoaded).toBe(true);
  });

  it('should initialize Google Auth', () => {
    const { result } = renderHook(() =>
      useGoogleAuth({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
      })
    );

    act(() => {
      result.current.initializeGoogleAuth();
    });

    expect(mockInitialize).toHaveBeenCalledWith({
      client_id: 'mock-google-client-id',
      callback: expect.any(Function),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  });

  it('should handle initialization error when no client ID', () => {
    vi.stubEnv('VITE_GOOGLE_CLIENT_ID', '');

    const { result } = renderHook(() =>
      useGoogleAuth({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
      })
    );

    act(() => {
      result.current.initializeGoogleAuth();
    });

    expect(mockOnError).toHaveBeenCalledWith(
      'Google Client ID nie jest skonfigurowane. Dodaj VITE_GOOGLE_CLIENT_ID do pliku .env'
    );
  });

  it('should render Google button with default config', () => {
    const { result } = renderHook(() =>
      useGoogleAuth({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
      })
    );

    const mockButtonElement = document.createElement('div');
    result.current.buttonRef.current = mockButtonElement;

    // First initialize, then render
    act(() => {
      result.current.initializeGoogleAuth();
    });

    act(() => {
      result.current.renderGoogleButton();
    });

    expect(mockRenderButton).toHaveBeenCalledWith(mockButtonElement, {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      shape: 'rectangular',
      logo_alignment: 'left',
      width: '100%',
      locale: 'pl',
    });
  });

  it('should render Google button with custom config', () => {
    const customConfig = {
      theme: 'filled_blue' as const,
      size: 'medium' as const,
      text: 'signin_with' as const,
    };

    const { result } = renderHook(() =>
      useGoogleAuth({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
      })
    );

    const mockButtonElement = document.createElement('div');
    result.current.buttonRef.current = mockButtonElement;

    // First initialize, then render
    act(() => {
      result.current.initializeGoogleAuth();
    });

    act(() => {
      result.current.renderGoogleButton(customConfig);
    });

    expect(mockRenderButton).toHaveBeenCalledWith(
      mockButtonElement,
      expect.objectContaining(customConfig)
    );
  });

  it('should handle successful credential response', async () => {
    const mockToken =
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJuYW1lIjoiVGVzdCBVc2VyIiwicGljdHVyZSI6Imh0dHBzOi8vZXhhbXBsZS5jb20vYXZhdGFyLmpwZyIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJVc2VyIn0.signature';

    const { result } = renderHook(() =>
      useGoogleAuth({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
      })
    );

    act(() => {
      result.current.initializeGoogleAuth();
    });

    await act(async () => {
      if (capturedCallback) {
        await capturedCallback({
          credential: mockToken,
          select_by: 'user',
        });
      }
    });

    expect(mockOnSuccess).toHaveBeenCalledWith(
      {
        id: '123456789',
        email: 'test@example.com',
        name: 'Test User',
        picture: 'https://example.com/avatar.jpg',
        given_name: 'Test',
        family_name: 'User',
      },
      mockToken
    );
  });

  it('should handle JWT decode error', async () => {
    // Create new hook instance with fresh environment
    vi.stubEnv('VITE_GOOGLE_CLIENT_ID', 'mock-google-client-id');

    const { result } = renderHook(() =>
      useGoogleAuth({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
      })
    );

    act(() => {
      result.current.initializeGoogleAuth();
    });

    await act(async () => {
      if (capturedCallback) {
        await capturedCallback({
          credential: 'invalid-token',
          select_by: 'user',
        });
      }
    });

    expect(mockOnError).toHaveBeenCalledWith(
      'Błąd podczas dekodowania danych użytkownika'
    );
  });

  it('should prompt Google One Tap', () => {
    const { result } = renderHook(() =>
      useGoogleAuth({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
      })
    );

    act(() => {
      result.current.initializeGoogleAuth();
    });

    act(() => {
      result.current.promptGoogleOneTap();
    });

    expect(mockPrompt).toHaveBeenCalled();
  });

  it('should cancel Google One Tap', () => {
    const { result } = renderHook(() =>
      useGoogleAuth({
        onSuccess: mockOnSuccess,
        onError: mockOnError,
      })
    );

    act(() => {
      result.current.cancelGoogleOneTap();
    });

    expect(mockCancel).toHaveBeenCalled();
  });
});
