import type { AuthUser } from "../../../hooks/auth/useAuth.hook";
import type { CommentResponse } from "../../../api/comments.api";

export interface CommentsSectionProps {
  postId: number;
  isAuthenticated: boolean;
  currentUser?: AuthUser | null;
}

export interface CommentItemProps {
  comment: CommentResponse;
  onLike: (id: number) => Promise<void>;
  onEdit?: (id: number, content: string) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
  currentUserId?: number;
  isAuthenticated: boolean;
}

export interface AddCommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  currentUser: AuthUser | null;
  isLoading: boolean;
}

export interface LoginPromptProps {
  onAuthRedirect?: () => void;
}

export interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export interface UserAvatarProps {
  username: string;
  size?: "sm" | "md" | "lg";
}

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}
