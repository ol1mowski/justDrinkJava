import axios, { type AxiosResponse } from 'axios';
import type { LoginFormData, RegisterFormData, AuthResponse, ApiError } from '../components/LoginSection/types/auth.types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export class AuthService {
  static async login(data: LoginFormData): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', data);
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = error.response?.data || {
        status: 'error',
        message: 'Wystąpił błąd podczas logowania',
      };
      throw apiError;
    }
  }

  static async register(data: RegisterFormData): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post('/auth/register', data);
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = error.response?.data || {
        status: 'error',
        message: 'Wystąpił błąd podczas rejestracji',
      };
      throw apiError;
    }
  }

  static async logout(): Promise<void> {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  static getStoredToken(): string | null {
    return localStorage.getItem('authToken');
  }

  static getStoredUser(): any | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  static storeAuthData(authResponse: AuthResponse): void {
    localStorage.setItem('authToken', authResponse.token);
    localStorage.setItem('user', JSON.stringify(authResponse.user));
  }
}

export default api; 