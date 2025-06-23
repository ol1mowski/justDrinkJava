import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostCardImage } from './components/PostCardImage.component';
import { PostCardContent } from './components/PostCardContent.component';
import { PostCardFooter } from './components/PostCardFooter.component';
import type { PostCardProps as PostCardData } from './types';

interface PostCardProps {
  post: PostCardData;
  onClick?: (post: PostCardData) => void;
}

export const PostCard = memo<PostCardProps>(({ post, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(post);
    } else {
      navigate(`/posts/${post.id}`);
    }
  };

  return (
    <article
      className="group bg-java-white dark:bg-java-dark-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-java-light-gray/20 dark:border-java-dark-surface/50"
      onClick={handleClick}
    >
      <PostCardImage
        imageUrl={post.imageUrl}
        title={post.title}
        category={post.category}
        readTime={post.readTime}
      />

      <PostCardContent title={post.title} description={post.description} />

      <PostCardFooter
        user={post.user}
        createdAt={post.createdAt}
        postId={post.id}
        likes={post.likes}
        isLikedByCurrentUser={post.isLikedByCurrentUser}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-java-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </article>
  );
});

PostCard.displayName = 'PostCard';
