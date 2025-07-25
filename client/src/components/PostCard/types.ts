export interface PostCardProps {
  id: number;
  user: {
    id: number;
    username: string;
    avatarUrl?: string;
  };
  category: {
    id: number;
    name: string;
  };
  title: string;
  description: string;
  createdAt: string;
  readTime: number;
  imageUrl?: string;
  likes?: number;
  isLikedByCurrentUser?: boolean;
}
