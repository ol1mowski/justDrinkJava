import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import type { PostData } from '../../../utils/api';

interface PostCardProps {
  post: PostData;
  onReadMore?: () => void;
}

export const PostCard = memo<PostCardProps>(({ post, onReadMore }) => {
  const navigate = useNavigate();
  const hasImage = post.imageUrl && post.imageUrl.trim() !== '';
  const imageUrl = hasImage ? post.imageUrl : null;

  const handleClick = () => {
    if (onReadMore) {
      onReadMore();
    } else {
      navigate(`/posts/${post.id}`);
    }
  };

  return (
    <article
      className="group relative bg-java-white rounded-xl overflow-hidden 
                       border border-java-gray/10 
                       hover:border-java-orange/30 
                       transition-all duration-300 hover:shadow-lg hover:shadow-java-orange/10
                       hover:-translate-y-1 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={e => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLDivElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-java-orange via-java-red to-java-blue opacity-90">
              <div className="text-white text-4xl font-bold opacity-80">☕</div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-java-orange via-java-red to-java-blue opacity-90 flex items-center justify-center">
            <div className="text-white text-4xl font-bold opacity-80">☕</div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 mb-3 text-xs text-java-blue/90">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-java-blue/10 text-java-blue font-medium">
            {post.category ? post.category.name : 'Ogólne'}
          </span>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-3 h-3" />
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString('pl-PL', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-3 h-3" />
            <span>{post.readTimeFormatted}</span>
          </div>
        </div>

        <h3
          className="text-lg font-bold text-java-gray 
                      mb-3 group-hover:text-java-orange transition-colors duration-300 line-clamp-2"
        >
          {post.title}
        </h3>

        <p className="text-sm text-java-blue/90 mb-4 leading-relaxed line-clamp-3">
          {post.description}
        </p>

        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full bg-gradient-to-r from-java-orange to-java-red 
                         flex items-center justify-center text-white font-medium text-xs"
          >
            {post.user.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex items-center gap-1 text-xs text-java-gray">
            <UserIcon className="w-3 h-3" />
            <span className="font-medium">{post.user.username}</span>
          </div>
        </div>
      </div>
    </article>
  );
});

PostCard.displayName = 'PostCard';
