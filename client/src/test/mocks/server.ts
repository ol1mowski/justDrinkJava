import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserData,
} from '../../api/types.api';

// Mock user data
const mockUser: UserData = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  createdAt: '2024-01-01T00:00:00Z',
};

// Mock token
const mockToken = 'mock-jwt-token-123';

// Mock auth response
const mockAuthResponse: AuthResponse = {
  token: mockToken,
  type: 'Bearer',
  user: mockUser,
};

// API handlers
export const handlers = [
  // Login endpoint
  http.post('http://localhost:8080/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as LoginRequest;

    // Simulate successful login
    if (body.email === 'test@example.com' && body.password === 'password123') {
      return HttpResponse.json(mockAuthResponse);
    }

    // Simulate login error
    return HttpResponse.json(
      {
        status: 'error',
        message: 'Nieprawidłowe dane logowania',
        errors: {
          email: 'Nieprawidłowy email lub hasło',
        },
      },
      { status: 401 }
    );
  }),

  // Register endpoint
  http.post('http://localhost:8080/api/auth/register', async ({ request }) => {
    const body = (await request.json()) as RegisterRequest;

    // Simulate successful registration
    if (body.email && body.password) {
      return HttpResponse.json(mockAuthResponse);
    }

    // Simulate registration error
    return HttpResponse.json(
      {
        status: 'error',
        message: 'Błąd rejestracji',
        errors: {
          email: 'Email jest już zajęty',
        },
      },
      { status: 400 }
    );
  }),

  // Get current user endpoint (used by userService.getCurrent)
  http.get('http://localhost:8080/api/user/profile', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // Check if user is authenticated
    if (authHeader && authHeader.includes(mockToken)) {
      return HttpResponse.json(mockUser);
    }

    // Return unauthorized
    return HttpResponse.json(
      {
        status: 'error',
        message: 'Unauthorized',
      },
      { status: 401 }
    );
  }),

  // Current user endpoint
  http.get('http://localhost:8080/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    // Check if user is authenticated
    if (authHeader && authHeader.includes(mockToken)) {
      return HttpResponse.json({
        status: 'success',
        data: mockUser,
      });
    }

    // Return unauthorized
    return HttpResponse.json(
      {
        status: 'error',
        message: 'Unauthorized',
      },
      { status: 401 }
    );
  }),

  // Google OAuth endpoint
  http.post('http://localhost:8080/api/auth/google', async ({ request }) => {
    const body = (await request.json()) as { credential: string };

    if (body.credential) {
      return HttpResponse.json(mockAuthResponse);
    }

    return HttpResponse.json(
      {
        status: 'error',
        message: 'Błąd autoryzacji Google',
      },
      { status: 400 }
    );
  }),

  // GitHub OAuth endpoint
  http.post('http://localhost:8080/api/auth/github', async ({ request }) => {
    const body = (await request.json()) as { code: string; state: string };

    if (body.code && body.state) {
      return HttpResponse.json(mockAuthResponse);
    }

    return HttpResponse.json(
      {
        status: 'error',
        message: 'Błąd autoryzacji GitHub',
      },
      { status: 400 }
    );
  }),
];

// Setup server
export const server = setupServer(...handlers);
