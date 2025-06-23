import { memo, Suspense } from 'react';
import { PostCard } from '../PostCard/PostCard.component';
import { PostCardSkeleton } from './components/PostCardSkeleton.component';
import { EmptyState } from './components/EmptyState.component';
import { LoadingSpinner } from '../ui';
import type { PostDTO } from './types';

interface PostsGridProps {
  posts: PostDTO[];
  isLoading: boolean;
  onPostClick?: (post: PostDTO) => void;
}

export const PostsGrid = memo<PostsGridProps>(
  ({ posts, isLoading, onPostClick }) => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (posts.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="animate-fadeInUp"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both',
            }}
          >
            <Suspense fallback={<PostCardSkeleton />}>
              <PostCard post={post} onClick={onPostClick} />
            </Suspense>
          </div>
        ))}
      </div>
    );
  }
);

PostsGrid.displayName = 'PostsGrid';
