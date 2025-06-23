export interface PostDTO {
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

export interface PostsGridProps {
  posts: PostDTO[];
  isLoading?: boolean;
}
