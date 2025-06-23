import { motion } from 'framer-motion';
import { HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { memo } from 'react';
import type { PostInteractions } from '../../hooks/usePostInteractions.hook';

interface PostDetailActionsProps {
  interactions: PostInteractions;
  onToggleLike: () => void;
  onToggleBookmark: () => void;
}

export const PostDetailActions = memo(
  ({ interactions, onToggleLike }: PostDetailActionsProps) => {
    return (
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-java-light-gray/20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
            interactions.isLiked
              ? 'bg-red-50 text-red-600'
              : 'bg-gray-50 text-java-gray hover:bg-gray-100 hover:text-java-orange'
          }`}
        >
          {interactions.isLiked ? (
            <HeartSolidIcon className="w-5 h-5" />
          ) : (
            <HeartIcon className="w-5 h-5" />
          )}
          <span className="font-medium">{interactions.likeCount}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-java-gray hover:bg-gray-100 hover:text-java-orange transition-all duration-200"
        >
          <ShareIcon className="w-5 h-5" />
          <span className="font-medium">Udostępnij</span>
        </motion.button>
      </div>
    );
  }
);

PostDetailActions.displayName = 'PostDetailActions';
