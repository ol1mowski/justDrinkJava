import { motion } from 'framer-motion'
import { memo, useState } from 'react'
import { 
  ChatBubbleLeftIcon, 
  HeartIcon, 
  UserCircleIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import type { AuthUser } from '../../hooks/useAuth.hook'
import { useComments } from '../../hooks/useComments.hook'
import type { CommentResponse } from '../../api/comments.api'

interface CommentsSectionProps {
  postId: number
  isAuthenticated: boolean
  currentUser?: AuthUser | null
}

const CommentItem = memo<{ 
  comment: CommentResponse; 
  onLike: (id: number) => void;
  onEdit?: (id: number, content: string) => void;
  onDelete?: (id: number) => void;
  currentUserId?: number;
  isAuthenticated: boolean;
}>(({ comment, onLike, onEdit, onDelete, currentUserId, isAuthenticated }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isOwner = currentUserId === comment.user.id
  const canInteract = isAuthenticated

  const handleEdit = async () => {
    if (!onEdit || !editContent.trim()) return

    setIsSubmitting(true)
    try {
      await onEdit(comment.id, editContent.trim())
      setIsEditing(false)
    } catch (error) {
      console.error('Błąd podczas edycji komentarza:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditContent(comment.content)
  }

  const handleDelete = async () => {
    if (!onDelete) return
    
    if (window.confirm('Czy na pewno chcesz usunąć ten komentarz?')) {
      try {
        await onDelete(comment.id)
      } catch (error) {
        console.error('Błąd podczas usuwania komentarza:', error)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-java-dark-surface rounded-lg p-4 border border-java-orange/10 shadow-sm"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-java-orange to-java-red 
                         flex items-center justify-center text-white font-medium text-sm">
            {comment.user.username.charAt(0).toUpperCase()}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="text-sm font-semibold text-java-gray dark:text-java-dark-text">
              {comment.user.username}
            </h4>
            <span className="text-xs text-java-blue/70 dark:text-java-dark-text-secondary">
              {formatDate(comment.createdAt)}
            </span>
            {isOwner && (
              <div className="flex items-center space-x-1 ml-auto">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs text-java-blue hover:text-java-orange transition-colors"
                  disabled={isSubmitting}
                >
                  {isEditing ? 'Anuluj' : 'Edytuj'}
                </button>
                <span className="text-xs text-gray-300">•</span>
                <button
                  onClick={handleDelete}
                  className="text-xs text-red-500 hover:text-red-600 transition-colors"
                  disabled={isSubmitting}
                >
                  Usuń
                </button>
              </div>
            )}
          </div>
          
          {isEditing ? (
            <div className="mb-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 border border-java-light-gray/30 rounded-lg resize-none focus:outline-none 
                         focus:ring-2 focus:ring-java-orange/50 focus:border-java-orange text-sm
                         dark:bg-java-dark-bg dark:border-java-dark-border dark:text-java-dark-text"
                rows={3}
                disabled={isSubmitting}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
                  disabled={isSubmitting}
                >
                  Anuluj
                </button>
                <button
                  onClick={handleEdit}
                  disabled={!editContent.trim() || isSubmitting}
                  className="px-3 py-1 text-xs bg-java-orange hover:bg-java-red text-white rounded-md transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Zapisywanie...' : 'Zapisz'}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-java-blue/90 dark:text-java-dark-text-secondary leading-relaxed mb-3">
              {comment.content}
            </p>
          )}
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => canInteract && onLike(comment.id)}
              disabled={!canInteract}
              className={`flex items-center space-x-1 text-xs transition-colors ${
                canInteract 
                  ? comment.isLikedByCurrentUser
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-java-blue/70 hover:text-red-500'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              {comment.isLikedByCurrentUser ? (
                <HeartSolidIcon className="w-4 h-4" />
              ) : (
                <HeartIcon className="w-4 h-4" />
              )}
              <span>{comment.likes}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

CommentItem.displayName = 'CommentItem'

const AddCommentForm = memo<{ 
  onSubmit: (content: string) => Promise<void>; 
  currentUser: AuthUser | null;
  isLoading: boolean;
}>(({ onSubmit, currentUser, isLoading }) => {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await onSubmit(content.trim())
      setContent('')
    } catch (error) {
      console.error('Błąd podczas dodawania komentarza:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-java-dark-surface rounded-lg p-4 border border-java-orange/20 shadow-sm"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-java-orange to-java-red 
                         flex items-center justify-center text-white font-medium text-sm">
            {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Napisz komentarz..."
            className="w-full p-3 border border-java-light-gray/30 rounded-lg resize-none focus:outline-none 
                     focus:ring-2 focus:ring-java-orange/50 focus:border-java-orange
                     dark:bg-java-dark-bg dark:border-java-dark-border dark:text-java-dark-text
                     dark:placeholder-java-dark-text-secondary"
            rows={3}
            disabled={isSubmitting || isLoading}
          />
          
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-java-blue/70 dark:text-java-dark-text-secondary">
              {content.length}/2000 znaków
            </span>
            
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting || isLoading || content.length > 2000}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-java-orange hover:bg-java-red 
                       text-white font-medium rounded-lg transition-colors duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       focus:outline-none focus:ring-2 focus:ring-java-orange/50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Dodawanie...</span>
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="w-4 h-4" />
                  <span>Dodaj komentarz</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
})

AddCommentForm.displayName = 'AddCommentForm'

const LoginPrompt = memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-java-orange/5 to-java-blue/5 rounded-lg p-6 text-center border border-java-orange/20"
    >
      <UserCircleIcon className="w-12 h-12 text-java-orange mx-auto mb-3" />
      <h3 className="text-lg font-semibold text-java-gray dark:text-java-dark-text mb-2">
        Zaloguj się, aby dodać komentarz
      </h3>
      <p className="text-java-blue/90 dark:text-java-dark-text-secondary mb-4">
        Dołącz do dyskusji i podziel się swoją opinią o tym artykule
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => window.location.href = '/auth'}
          className="inline-flex items-center justify-center px-6 py-2 bg-java-orange hover:bg-java-red 
                   text-white font-medium rounded-lg transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-java-orange/50"
        >
          Zaloguj się
        </button>
        <button
          onClick={() => window.location.href = '/auth'}
          className="inline-flex items-center justify-center px-6 py-2 bg-white hover:bg-java-light-gray 
                   text-java-gray font-medium rounded-lg transition-colors duration-200 
                   border border-java-light-gray/30
                   focus:outline-none focus:ring-2 focus:ring-java-orange/50"
        >
          Zarejestruj się
        </button>
      </div>
    </motion.div>
  )
})

LoginPrompt.displayName = 'LoginPrompt'

const ErrorState = memo<{ error: string; onRetry: () => void }>(({ error, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
    >
      <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-3" />
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Błąd podczas ładowania komentarzy
      </h3>
      <p className="text-red-600 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 
                 text-white font-medium rounded-lg transition-colors"
      >
        Spróbuj ponownie
      </button>
    </motion.div>
  )
})

ErrorState.displayName = 'ErrorState'

export const CommentsSection = memo<CommentsSectionProps>(({ postId, isAuthenticated, currentUser }) => {
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
  } = useComments(postId)

  const handleAddComment = async (content: string) => {
    if (!isAuthenticated || !currentUser) return

    await createComment({
      postId,
      content
    })
  }

  const handleEditComment = async (commentId: number, content: string) => {
    await updateComment(commentId, { content })
  }

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment(commentId)
  }

  const handleToggleLike = async (commentId: number) => {
    if (!isAuthenticated) return
    await toggleLike(commentId)
  }

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
    )
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
          Komentarze ({isLoading ? '...' : commentsCount})
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
          <div className="animate-spin w-8 h-8 border-2 border-java-orange border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-java-blue/70 dark:text-java-dark-text-secondary">
            Ładowanie komentarzy...
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem 
                key={comment.id} 
                comment={comment} 
                onLike={handleToggleLike}
                onEdit={isAuthenticated ? handleEditComment : undefined}
                onDelete={isAuthenticated ? handleDeleteComment : undefined}
                currentUserId={currentUser?.id ? 
                  (typeof currentUser.id === 'string' ? parseInt(currentUser.id) : currentUser.id) 
                  : undefined
                }
                isAuthenticated={isAuthenticated}
              />
            ))
          ) : (
            <div className="text-center py-8 text-java-blue/70 dark:text-java-dark-text-secondary">
              <ChatBubbleLeftIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Brak komentarzy. Bądź pierwszy i dodaj swój komentarz!</p>
            </div>
          )}
        </div>
      )}
    </motion.section>
  )
})

CommentsSection.displayName = 'CommentsSection' 