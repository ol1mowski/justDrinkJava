import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Hoisted mocks - must be at the top
vi.mock('../../../../utils/api', () => ({
  API_BASE_URL: 'http://localhost:8080/api',
}));

// Mock fetch before importing anything else
const mockFetch = vi.fn();

// Import after mocking
import { authApi, tokenStorage } from '../api.util';

// Create proper localStorage mock
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('api.util', () => {
  beforeEach(() => {
    // Set our mock fetch globally
    global.fetch = mockFetch;
    vi.clearAllMocks();
    mockFetch.mockClear();
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.removeItem.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('authApi.login', () => {
    it('should make successful login request', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      };

      const mockResponse = {
        token: 'mock-jwt-token-123',
        type: 'Bearer',
        user: {
          id: 1,
          email: 'test@example.com',
          username: 'testuser',
          createdAt: '2024-01-01T00:00:00Z',
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await authApi.login(loginData);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123',
          }),
        }
      );

      expect(result).toEqual(mockResponse);
    });

    it('should handle login error response', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword',
        rememberMe: false,
      };

      mockFetch.mockResolvedValue({
        ok: false,
        status: 401,
        json: () =>
          Promise.resolve({
            message: 'Nieprawidłowe dane logowania',
          }),
      });

      await expect(authApi.login(loginData)).rejects.toThrow(
        'Nieprawidłowe dane logowania'
      );
    });

    it('should handle network error', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      };

      mockFetch.mockRejectedValue(new Error('Network error'));

      await expect(authApi.login(loginData)).rejects.toThrow('Network error');
    });

    it('should handle malformed JSON response', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      };

      mockFetch.mockResolvedValue({
        ok: false,
        json: () => Promise.reject(new Error('Invalid JSON')),
      });

      await expect(authApi.login(loginData)).rejects.toThrow(
        'Wystąpił błąd serwera'
      );
    });
  });

  describe('authApi.register', () => {
    it('should make successful register request', async () => {
      const registerData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const mockResponse = {
        token: 'mock-jwt-token-123',
        type: 'Bearer',
        user: {
          id: 1,
          email: 'test@example.com',
          username: 'testuser',
          createdAt: '2024-01-01T00:00:00Z',
        },
      };

      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await authApi.register(registerData);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123',
          }),
        }
      );

      expect(result).toEqual(mockResponse);
    });

    it('should handle register error response', async () => {
      const registerData = {
        username: 'testuser',
        email: 'existing@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: () =>
          Promise.resolve({
            message: 'Email już istnieje',
            field: 'email',
          }),
      });

      await expect(authApi.register(registerData)).rejects.toThrow(
        'Email już istnieje'
      );
    });

    it('should handle 500 server error', async () => {
      const registerData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        json: () =>
          Promise.resolve({
            message: 'Internal server error',
          }),
      });

      await expect(authApi.register(registerData)).rejects.toThrow(
        'Internal server error'
      );
    });
  });

  describe('tokenStorage', () => {
    it('should set token in localStorage', () => {
      const token = 'test-token-123';

      tokenStorage.set(token);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'auth_token',
        token
      );
    });

    it('should get token from localStorage', () => {
      const token = 'test-token-123';
      mockLocalStorage.getItem.mockReturnValue(token);

      const result = tokenStorage.get();

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('auth_token');
      expect(result).toBe(token);
    });

    it('should remove token from localStorage', () => {
      tokenStorage.remove();

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('auth_token');
    });

    it('should return null when no token exists', () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = tokenStorage.get();

      expect(result).toBe(null);
    });

    it('should handle multiple operations', () => {
      const token1 = 'token-1';
      const token2 = 'token-2';

      tokenStorage.set(token1);
      tokenStorage.set(token2);
      tokenStorage.remove();

      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(2);
      expect(mockLocalStorage.removeItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('error handling', () => {
    it('should create ApiError with field', async () => {
      const loginData = {
        email: 'invalid-email',
        password: 'password123',
        rememberMe: false,
      };

      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: () =>
          Promise.resolve({
            message: 'Nieprawidłowe dane logowania',
            field: 'email',
          }),
      });

      try {
        await authApi.login(loginData);
        expect.fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.message).toBe('Nieprawidłowe dane logowania');
        expect(error.field).toBe('email');
        expect(error.name).toBe('ApiError');
      }
    });

    it('should handle response without message', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      };

      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve({}),
      });

      try {
        await authApi.login(loginData);
        expect.fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.message).toBe('Wystąpił błąd');
      }
    });
  });
});
