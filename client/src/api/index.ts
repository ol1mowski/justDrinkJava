export * from './base.api';
export * from './http-client.api';
export * from './types.api';
export * from './services.api';

import {
  authService,
  postService,
  userService,
  quizService,
} from './services.api';
import type {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  GoogleAuthRequest,
  GitHubAuthRequest,
} from './types.api';

export const apiService = {
  getLatestPost: postService.getLatest,
  getPostById: postService.getById,
  getLatestPostByCategory: postService.getLatestByCategory,
  searchPosts: postService.search,
  togglePostLike: postService.toggleLike,
  getCurrentUser: userService.getCurrent,
  updateProfile: userService.updateProfile,
  changePassword: userService.changePassword,
  deleteAccount: userService.deleteAccount,
  getAllQuizzes: quizService.getAll,
  getQuizById: quizService.getById,
  getQuizQuestions: quizService.getQuestions,
  checkQuizAnswers: quizService.checkAnswers,
  getQuizzesByCategory: quizService.getByCategory,
};

export const authApi = {
  login: async (
    credentials: LoginRequest
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      const data = await authService.login(credentials);
      return { status: 'success' as const, data };
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  register: async (
    userData: RegisterRequest
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      const data = await authService.register(userData);
      return { status: 'success' as const, data };
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  googleAuth: async (
    googleData: GoogleAuthRequest
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      const data = await authService.googleAuth(googleData);
      return { status: 'success' as const, data };
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  githubAuth: async (
    githubData: GitHubAuthRequest
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      const data = await authService.githubAuth(githubData);
      return { status: 'success' as const, data };
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  logout: authService.logout,
};

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
