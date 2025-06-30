import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserData,
  PostData,
} from '../../api/types.api';

const mockUser: UserData = {
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  createdAt: '2024-01-01T00:00:00Z',
};

const mockToken = 'mock-jwt-token-123';

const mockAuthResponse: AuthResponse = {
  token: mockToken,
  type: 'Bearer',
  user: mockUser,
};

const mockPosts: PostData[] = [
  {
    id: 1,
    user: {
      id: 1,
      username: 'user1',
      email: 'user1@test.com',
      createdAt: '2023-01-01T00:00:00Z',
    },
    category: { id: 1, name: 'Programming' },
    title: 'Test Post 1',
    description: 'Description 1',
    createdAt: '2023-01-01T00:00:00Z',
    readTime: 5,
    readTimeFormatted: '5 min',
    likes: 10,
    isLikedByCurrentUser: false,
  },
  {
    id: 2,
    user: {
      id: 2,
      username: 'user2',
      email: 'user2@test.com',
      createdAt: '2023-01-02T00:00:00Z',
    },
    category: { id: 2, name: 'Design' },
    title: 'Test Post 2',
    description: 'Description 2',
    createdAt: '2023-01-02T00:00:00Z',
    readTime: 3,
    readTimeFormatted: '3 min',
    likes: 15,
    isLikedByCurrentUser: false,
  },
];

export const handlers = [
  http.post('http://localhost:8080/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as LoginRequest;

    if (body.email === 'test@example.com' && body.password === 'password123') {
      return HttpResponse.json(mockAuthResponse);
    }

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

  http.post('http://localhost:8080/api/auth/register', async ({ request }) => {
    const body = (await request.json()) as RegisterRequest;

    if (body.email && body.password) {
      return HttpResponse.json(mockAuthResponse);
    }

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

  http.get('http://localhost:8080/api/user/profile', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (authHeader && authHeader.includes(mockToken)) {
      return HttpResponse.json(mockUser);
    }

    return HttpResponse.json(
      {
        status: 'error',
        message: 'Unauthorized',
      },
      { status: 401 }
    );
  }),

  http.get('http://localhost:8080/api/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (authHeader && authHeader.includes(mockToken)) {
      return HttpResponse.json({
        status: 'success',
        data: mockUser,
      });
    }

    return HttpResponse.json(
      {
        status: 'error',
        message: 'Unauthorized',
      },
      { status: 401 }
    );
  }),

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

  http.get('http://localhost:8080/api/posts', ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');

    const postsToReturn = limit
      ? mockPosts.slice(0, parseInt(limit))
      : mockPosts;

    return HttpResponse.json(postsToReturn);
  }),
];

export const server = setupServer(...handlers);
