export * from './base.api';
export * from './httpClient.api';
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
  PostData,
  SearchPostsRequest,
  SearchPostsResponse,
  UserData,
  UpdateProfileRequest,
  UpdateProfileResponse,
  ChangePasswordRequest,
  StandardResponse,
  QuizData,
  QuizContentData,
  QuizAnswerRequest,
  QuizResultData,
  QuizListResponse,
} from './types.api';

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

  logout: authService.logout,
};

export const postApi = {
  search: async (
    request: SearchPostsRequest
  ): Promise<ApiResponse<SearchPostsResponse>> => {
    try {
      const data = await postService.search(request);
      return { status: 'success' as const, data };
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  getById: async (id: number): Promise<ApiResponse<PostData>> => {
    try {
      const data = await postService.getById(id);
      return { status: 'success' as const, data };
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  toggleLike: async (id: number): Promise<ApiResponse<PostData>> => {
    try {
      const data = await postService.toggleLike(id);
      return { status: 'success' as const, data };
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};

export const userApi = {
  getCurrent: async (): Promise<ApiResponse<UserData>> => {
    try {
      const data = await userService.getCurrent();
      return { status: 'success' as const, data };
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  updateProfile: async (
    request: UpdateProfileRequest
  ): Promise<ApiResponse<UpdateProfileResponse>> => {
    try {
      const data = await userService.updateProfile(request);
      return { status: 'success' as const, data };
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  changePassword: async (
    request: ChangePasswordRequest
  ): Promise<ApiResponse<StandardResponse>> => {
    try {
      const data = await userService.changePassword(request);
      return { status: 'success' as const, data };
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};

export const quizApi = {
  getAll: async (
    page: number = 0,
    size: number = 10
  ): Promise<ApiResponse<QuizListResponse>> => {
    try {
      const data = await quizService.getAll(page, size);
      return data;
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  getById: async (id: number): Promise<ApiResponse<QuizData>> => {
    try {
      const data = await quizService.getById(id);
      return data;
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  getQuestions: async (id: number): Promise<ApiResponse<QuizContentData[]>> => {
    try {
      const data = await quizService.getQuestions(id);
      return data;
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  checkAnswers: async (
    request: QuizAnswerRequest
  ): Promise<ApiResponse<QuizResultData>> => {
    try {
      const data = await quizService.checkAnswers(request);
      return data;
    } catch (error) {
      return {
        status: 'error' as const,
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
