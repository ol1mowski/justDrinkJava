import { PostDetailHeader } from './PostDetailHeader.component';

interface PostDetailSkeletonProps {
  onBack: () => void;
}

export const PostDetailSkeleton = ({ onBack }: PostDetailSkeletonProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-java-light-blue to-java-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PostDetailHeader onBack={onBack} />

        <div className="animate-pulse">
          <div className="h-64 md:h-80 bg-gray-200 rounded-2xl mb-8"></div>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
