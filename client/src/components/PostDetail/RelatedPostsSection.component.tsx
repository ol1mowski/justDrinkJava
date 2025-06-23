import { motion } from 'framer-motion';
import { memo } from 'react';
import { PostCard } from '../PostsSection/components/PostCard.component';
import type { PostData } from '../../utils/api';

interface RelatedPostsSectionProps {
  posts: PostData[];
  isLoading: boolean;
}

const RelatedPostsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[1, 2].map(index => (
      <div key={index} className="animate-pulse">
        <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="text-center py-8 text-gray-500">
    <p>Brak powiązanych postów do wyświetlenia.</p>
  </div>
);

export const RelatedPostsSection = memo(
  ({ posts, isLoading }: RelatedPostsSectionProps) => {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-bold text-java-dark mb-6">
          Podobne posty
        </h2>

        {isLoading ? (
          <RelatedPostsSkeleton />
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </motion.section>
    );
  }
);

RelatedPostsSection.displayName = 'RelatedPostsSection';
