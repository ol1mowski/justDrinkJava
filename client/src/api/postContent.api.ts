import { API_BASE_URL } from '../utils/api';

export interface PostContentResponse {
  id: number;
  content: string;
  postId: number;
  categoryId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  status: number;
  error: string;
  message: string;
  path: string;
  timestamp: string;
}

class PostContentApiError extends Error {
  public status: number;
  public error: string;
  public path: string;
  public timestamp: string;

  constructor(
    status: number,
    error: string,
    message: string,
    path: string,
    timestamp: string
  ) {
    super(message);
    this.name = 'PostContentApiError';
    this.status = status;
    this.error = error;
    this.path = path;
    this.timestamp = timestamp;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData: ApiError = await response.json();
    throw new PostContentApiError(
      errorData.status,
      errorData.error,
      errorData.message,
      errorData.path,
      errorData.timestamp
    );
  }

  return response.json();
}

export const postContentApi = {
  getById: async (id: number): Promise<PostContentResponse> => {
    const response = await fetch(`${API_BASE_URL}/post-content/${id}`);
    return handleResponse<PostContentResponse>(response);
  },

  getByPostId: async (postId: number): Promise<PostContentResponse> => {
    const response = await fetch(`${API_BASE_URL}/post-content/post/${postId}`);
    return handleResponse<PostContentResponse>(response);
  },

  getAll: async (categoryId?: number): Promise<PostContentResponse[]> => {
    const url = new URL(`${API_BASE_URL}/post-content`);
    if (categoryId) {
      url.searchParams.append('categoryId', categoryId.toString());
    }

    const response = await fetch(url.toString());
    return handleResponse<PostContentResponse[]>(response);
  },
};

export { PostContentApiError };
