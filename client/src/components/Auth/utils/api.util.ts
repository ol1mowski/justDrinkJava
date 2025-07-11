import type { LoginFormData, RegisterFormData, AuthResponse } from '../types';
import { API_BASE_URL } from '../../../utils/api';

class ApiError extends Error {
  public field?: string;

  constructor(message: string, field?: string) {
    super(message);
    this.name = 'ApiError';
    this.field = field;
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: 'Wystąpił błąd serwera' }));
    throw new ApiError(errorData.message || 'Wystąpił błąd', errorData.field);
  }

  return response.json();
};

export const authApi = {
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    return handleResponse<AuthResponse>(response);
  },

  register: async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    return handleResponse<AuthResponse>(response);
  },
};

export const tokenStorage = {
  get: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  set: (token: string): void => {
    localStorage.setItem('auth_token', token);
  },

  remove: (): void => {
    localStorage.removeItem('auth_token');
  },
};
