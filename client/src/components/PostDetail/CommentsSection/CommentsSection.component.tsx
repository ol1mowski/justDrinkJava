import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import type { CommentsSectionProps } from './types';
import { useComments } from './hooks/useComments.hook';
import {
  CommentItem,
  AddCommentForm,
  LoginPrompt,
  ErrorState,
  LoadingSpinner,
} from './components';

export const CommentsSection = memo<CommentsSectionProps>(
  ({ postId, isAuthenticated, currentUser }) => {
    const {
      comments,
      isLoading,
      isError,
      error,
      commentsCount,
      createComment,
      updateComment,
      deleteComment,
      toggleLike,
      refetch,
    } = useComments(postId);

    const handleAddComment = useCallback(
      async (content: string) => {
        if (!isAuthenticated || !currentUser) return;
        await createComment({ postId, content });
      },
      [isAuthenticated, currentUser, createComment, postId]
    );

    const handleEditComment = useCallback(
      async (commentId: number, content: string) => {
        await updateComment(commentId, { content });
      },
      [updateComment]
    );

    const handleDeleteComment = useCallback(
      async (commentId: number) => {
        await deleteComment(commentId);
      },
      [deleteComment]
    );

    const handleToggleLike = useCallback(
      async (commentId: number) => {
        if (!isAuthenticated) return;
        await toggleLike(commentId);
      },
      [isAuthenticated, toggleLike]
    );

    const parseCurrentUserId = useCallback(() => {
      if (!currentUser?.id) return undefined;
      return typeof currentUser.id === 'string'
        ? parseInt(currentUser.id)
        : currentUser.id;
    }, [currentUser?.id]);

    if (isError) {
      return (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <div className="flex items-center space-x-3 mb-6">
            <ChatBubbleLeftIcon className="w-6 h-6 text-java-orange" />
            <h2 className="text-2xl font-bold text-java-gray dark:text-java-dark-text">
              Komentarze
            </h2>
          </div>
          <ErrorState error={error || 'Wystąpił błąd'} onRetry={refetch} />
        </motion.section>
      );
    }

    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12"
      >
        <div className="flex items-center space-x-3 mb-6">
          <ChatBubbleLeftIcon className="w-6 h-6 text-java-orange" />
          <h2 className="text-2xl font-bold text-java-gray dark:text-java-dark-text">
            Komentarze (
            {isLoading && comments.length === 0 ? '...' : commentsCount})
          </h2>
        </div>

        {isAuthenticated && currentUser ? (
          <div className="mb-6">
            <AddCommentForm
              onSubmit={handleAddComment}
              currentUser={currentUser}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div className="mb-6">
            <LoginPrompt />
          </div>
        )}

        {isLoading && comments.length === 0 ? (
          <div className="text-center py-8">
            <LoadingSpinner size="lg" className="mx-auto mb-3" />
            <p className="text-java-blue/70 dark:text-java-dark-text-secondary">
              Ładowanie komentarzy...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map(comment => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onLike={handleToggleLike}
                  onEdit={isAuthenticated ? handleEditComment : undefined}
                  onDelete={isAuthenticated ? handleDeleteComment : undefined}
                  currentUserId={parseCurrentUserId()}
                  isAuthenticated={isAuthenticated}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-java-blue/70 dark:text-java-dark-text-secondary"
              >
                <ChatBubbleLeftIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Brak komentarzy. Bądź pierwszy i dodaj swój komentarz!</p>
              </motion.div>
            )}
          </div>
        )}
      </motion.section>
    );
  }
);

CommentsSection.displayName = 'CommentsSection';
