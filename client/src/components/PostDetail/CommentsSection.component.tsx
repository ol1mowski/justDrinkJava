import { motion } from 'framer-motion'
import { memo, useState } from 'react'
import { 
  ChatBubbleLeftIcon, 
  HeartIcon, 
  UserCircleIcon,
  PaperAirplaneIcon 
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import type { AuthUser } from '../../hooks/useAuth.hook'

interface Comment {
  id: number
  author: {
    id: number
    username: string
    avatar?: string
  }
  content: string
  createdAt: string
  likesCount: number
  isLiked: boolean
}

interface CommentsSectionProps {
  postId: number
  isAuthenticated: boolean
  currentUser?: AuthUser | null
}

// Mockowe komentarze do demonstracji
const mockComments: Comment[] = [
  {
    id: 1,
    author: {
      id: 1,
      username: 'javaDeveloper',
      avatar: undefined
    },
    content: 'Świetny artykuł! Bardzo pomocne wyjaśnienie Spring Boot. Czy możesz dodać przykład z bazą danych?',
    createdAt: '2024-01-15T10:30:00Z',
    likesCount: 5,
    isLiked: false
  },
  {
    id: 2,
    author: {
      id: 2,
      username: 'codeReviewer',
      avatar: undefined
    },
    content: 'Zgadzam się z poprzednim komentarzem. Dodatkowo, czy warto wspomnieć o best practices w konfiguracji?',
    createdAt: '2024-01-15T11:45:00Z',
    likesCount: 3,
    isLiked: true
  },
  {
    id: 3,
    author: {
      id: 3,
      username: 'backendMaster',
      avatar: undefined
    },
    content: 'Dzięki za ten post! Pomógł mi rozwiązać problem z konfiguracją, nad którym siedziałem cały dzień.',
    createdAt: '2024-01-15T14:20:00Z',
    likesCount: 8,
    isLiked: false
  }
]

const CommentItem = memo<{ comment: Comment; onLike: (id: number) => void }>(({ comment, onLike }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-java-dark-surface rounded-lg p-4 border border-java-orange/10 shadow-sm"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {comment.author.avatar ? (
            <img
              src={comment.author.avatar}
              alt={comment.author.username}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-java-orange to-java-red 
                           flex items-center justify-center text-white font-medium text-sm">
              {comment.author.username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="text-sm font-semibold text-java-gray dark:text-java-dark-text">
              {comment.author.username}
            </h4>
            <span className="text-xs text-java-blue/70 dark:text-java-dark-text-secondary">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          
          <p className="text-sm text-java-blue/90 dark:text-java-dark-text-secondary leading-relaxed mb-3">
            {comment.content}
          </p>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onLike(comment.id)}
              className={`flex items-center space-x-1 text-xs transition-colors ${
                comment.isLiked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-java-blue/70 hover:text-red-500'
              }`}
            >
              {comment.isLiked ? (
                <HeartSolidIcon className="w-4 h-4" />
              ) : (
                <HeartIcon className="w-4 h-4" />
              )}
              <span>{comment.likesCount}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

CommentItem.displayName = 'CommentItem'

const AddCommentForm = memo<{ onSubmit: (content: string) => void; currentUser: AuthUser | null }>(({ onSubmit, currentUser }) => {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    await onSubmit(content.trim())
    setContent('')
    setIsSubmitting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-java-dark-surface rounded-lg p-4 border border-java-orange/20 shadow-sm"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-java-orange to-java-red 
                           flex items-center justify-center text-white font-medium text-sm">
              {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
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
            disabled={isSubmitting}
          />
          
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-java-blue/70 dark:text-java-dark-text-secondary">
              {content.length}/500 znaków
            </span>
            
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting || content.length > 500}
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

export const CommentsSection = memo<CommentsSectionProps>(({ isAuthenticated, currentUser }) => {
  const [comments, setComments] = useState<Comment[]>(mockComments)

  const handleLikeComment = (commentId: number) => {
    if (!isAuthenticated) return

    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likesCount: comment.isLiked ? comment.likesCount - 1 : comment.likesCount + 1
          }
        : comment
    ))
  }

  const handleAddComment = async (content: string) => {
    if (!isAuthenticated || !currentUser) return

    // Symulacja dodawania komentarza
    const newComment: Comment = {
      id: Date.now(),
      author: {
        id: typeof currentUser.id === 'string' ? parseInt(currentUser.id) : currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar
      },
      content,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      isLiked: false
    }

    setComments(prev => [newComment, ...prev])
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
          Komentarze ({comments.length})
        </h2>
      </div>
      
      {isAuthenticated && currentUser ? (
        <div className="mb-6">
          <AddCommentForm onSubmit={handleAddComment} currentUser={currentUser} />
        </div>
      ) : (
        <div className="mb-6">
          <LoginPrompt />
        </div>
      )}
      
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              onLike={handleLikeComment}
            />
          ))
        ) : (
          <div className="text-center py-8 text-java-blue/70 dark:text-java-dark-text-secondary">
            <ChatBubbleLeftIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Brak komentarzy. Bądź pierwszy i dodaj swój komentarz!</p>
          </div>
        )}
      </div>
    </motion.section>
  )
})

CommentsSection.displayName = 'CommentsSection' 