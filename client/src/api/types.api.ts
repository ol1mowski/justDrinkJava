export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  user: UserData;
  expiresIn?: number;
}

export interface UserData {
  id: number;
  email: string;
  username: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

export interface PostData {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  readTime: number;
  createdAt: string;
  category: CategoryData;
  user: UserData;
  likes: number;
  isLiked?: boolean;
}

export interface CategoryData {
  id: number;
  name: string;
}

export interface SearchPostsRequest {
  query?: string;
  categoryId?: number;
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchPostsResponse {
  content: PostData[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}

export interface UpdateProfileRequest {
  username: string;
}

export interface UpdateProfileResponse {
  user: UserData;
  token?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface StandardResponse {
  status: string;
  message: string;
}

export interface QuizData {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  timeLimit: number;
  createdAt: string;
  user: UserData;
}

export interface QuizContentData {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizAnswerRequest {
  quizId: number;
  answers: { questionId: number; selectedAnswer: string }[];
}

export interface QuizResultData {
  quizId: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  completedAt: string;
}

export interface QuizListResponse {
  content: QuizData[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}
