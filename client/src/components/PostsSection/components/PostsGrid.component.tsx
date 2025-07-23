import { memo } from 'react';
import { PostCard } from './PostCard.component';
import type { PostData } from '../../../api/types.api';

interface PostsGridProps {
  posts: PostData[];
}

export const PostsGrid = memo<PostsGridProps>(({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
});

PostsGrid.displayName = 'PostsGrid';
