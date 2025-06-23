import { memo, useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { usePostLike } from '../../../hooks/usePostLike.hook';
import { useAuth } from '../../../hooks/auth/useAuth.hook';

interface PostLikeButtonProps {
  postId: number;
  initialLikes: number;
  initialIsLiked: boolean;
  className?: string;
}

export const PostLikeButton = memo<PostLikeButtonProps>(
  ({ postId, initialLikes, initialIsLiked, className = '' }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const { toggleLike, isLoading } = usePostLike();
    const { isAuthenticated } = useAuth();

    const handleToggleLike = async (e: React.MouseEvent) => {
      e.stopPropagation(); // Zapobiega nawigacji do szczegółów posta

      if (!isAuthenticated) {
        // Można dodać toast notification o konieczności logowania
        return;
      }

      const result = await toggleLike(postId);

      if (result) {
        setLikes(result.likes);
        setIsLiked(result.isLikedByCurrentUser);
      }
    };

    return (
      <button
        onClick={handleToggleLike}
        disabled={isLoading || !isAuthenticated}
        className={`flex items-center space-x-1 text-xs transition-colors duration-200 ${
          isAuthenticated
            ? isLiked
              ? 'text-red-500 hover:text-red-600'
              : 'text-java-blue/70 hover:text-red-500'
            : 'text-gray-400 cursor-not-allowed'
        } ${className}`}
        title={
          isAuthenticated
            ? isLiked
              ? 'Usuń polubienie'
              : 'Polub post'
            : 'Zaloguj się aby polubić'
        }
      >
        {isLoading ? (
          <div className="animate-spin w-4 h-4 border border-current border-t-transparent rounded-full" />
        ) : isLiked ? (
          <HeartSolidIcon className="w-4 h-4" />
        ) : (
          <HeartIcon className="w-4 h-4" />
        )}
        <span className="font-medium">{likes}</span>
      </button>
    );
  }
);

PostLikeButton.displayName = 'PostLikeButton';
