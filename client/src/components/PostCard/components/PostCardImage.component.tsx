import { memo } from 'react';
import { ClockIcon, TagIcon } from '@heroicons/react/24/outline';

interface PostCardImageProps {
  imageUrl?: string;
  title: string;
  category: { id: number; name: string };
  readTime: number;
}

export const PostCardImage = memo<PostCardImageProps>(
  ({ imageUrl, title, category, readTime }) => {
    return (
      <div className="relative h-48 bg-gradient-to-br from-java-orange/10 to-java-blue/10 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 bg-java-orange/20 rounded-full flex items-center justify-center">
              <TagIcon className="w-8 h-8 text-java-orange" />
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-java-orange text-white backdrop-blur-sm">
            {category.name}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-java-dark-surface/90 text-java-gray dark:text-java-dark-text backdrop-blur-sm">
            <ClockIcon className="w-3 h-3 text-java-orange" />
            <span className="text-java-orange">{readTime} min</span>
          </div>
        </div>
      </div>
    );
  }
);

PostCardImage.displayName = 'PostCardImage';
