import { API_BASE_URL } from "../utils/api"

export interface CommentResponse {
  id: number
  postId: number
  user: {
    id: number
    email: string
    username: string
    createdAt: string
  }
  content: string
  likes: number
  isLikedByCurrentUser: boolean
  createdAt: string
}

export interface CreateCommentRequest {
  postId: number
  content: string
}

export interface UpdateCommentRequest {
  content: string
}

export interface ApiError {
  timestamp: string
  status: number
  error: string
  message: string
  path: string
}

class CommentsApiError extends Error {
  constructor(
    public status: number,
    public error: string,
    message: string,
    public path: string,
    public timestamp: string
  ) {
    super(message)
    this.name = 'CommentsApiError'
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData: ApiError = await response.json()
    throw new CommentsApiError(
      errorData.status,
      errorData.error,
      errorData.message,
      errorData.path,
      errorData.timestamp
    )
  }
  
  return response.json()
}

async function getAuthHeaders(): Promise<HeadersInit> {
  const token = localStorage.getItem("accessToken")
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }
  
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  
  return headers
}

export const commentsApi = {
  getByPostId: async (postId: number): Promise<CommentResponse[]> => {
    const headers = await getAuthHeaders()
    const response = await fetch(`${API_BASE_URL}/comments/post/${postId}`, {
      headers
    })
    return handleResponse<CommentResponse[]>(response)
  },

  getCountByPostId: async (postId: number): Promise<number> => {
    const headers = await getAuthHeaders() 
    const response = await fetch(`${API_BASE_URL}/comments/post/${postId}/count`, {
      headers
    })
    return handleResponse<number>(response)
  },

  create: async (request: CreateCommentRequest): Promise<CommentResponse> => {
    const headers = await getAuthHeaders()
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers,
      body: JSON.stringify(request)
    })
    return handleResponse<CommentResponse>(response)
  },

  update: async (commentId: number, request: UpdateCommentRequest): Promise<CommentResponse> => {
    const headers = await getAuthHeaders()
    const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(request)
    })
    return handleResponse<CommentResponse>(response)
  },

  delete: async (commentId: number): Promise<void> => {
    const headers = await getAuthHeaders()
    const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
      method: 'DELETE',
      headers
    })
    
    if (!response.ok) {
      const errorData: ApiError = await response.json()
      throw new CommentsApiError(
        errorData.status,
        errorData.error,
        errorData.message,
        errorData.path,
        errorData.timestamp
      )
    }
  },
    
  toggleLike: async (commentId: number): Promise<CommentResponse> => {
    const headers = await getAuthHeaders()
    const response = await fetch(`${API_BASE_URL}/comments/${commentId}/like`, {
      method: 'POST',
      headers
    })
    return handleResponse<CommentResponse>(response)
  }
}

export { CommentsApiError } 