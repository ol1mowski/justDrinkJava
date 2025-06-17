import { 
  PostDetailHeader,
  PostDetailHero,
  PostDetailContent,
  RelatedPostsSection,
  PostDetailSkeleton,
  PostDetailError
} from '../../components/PostDetail'
import { usePostDetailLogic } from '../../hooks/usePostDetailLogic.hook'

export const PostDetailPage = () => {
  const {
    postId,
    post,
    isPostLoading,
    isPostError,
    postError,
    relatedPosts,
    isRelatedLoading,
    interactions,
    toggleLike,
    toggleBookmark,
    handleBack,
    formatDate
  } = usePostDetailLogic()

  if (isPostLoading) {
    return <PostDetailSkeleton onBack={handleBack} />
  }
  
  if (isPostError || !post) {
    return <PostDetailError onBack={handleBack} error={postError} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-java-light-blue to-java-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PostDetailHeader onBack={handleBack} />
        
        <PostDetailHero
          imageUrl={post.imageUrl}
          title={post.title}
          categoryName={post.category?.name}
        />

        <PostDetailContent
          post={post}
          postId={postId}
          interactions={interactions}
          onToggleLike={toggleLike}
          onToggleBookmark={toggleBookmark}
          formatDate={formatDate}
        />

        <RelatedPostsSection
          posts={relatedPosts}
          isLoading={isRelatedLoading}
        />
      </div>
    </div>
  )
} 