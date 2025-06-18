import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import type { CommentItemProps } from '../types'
import { useCommentItem, useCommentUtils } from '../hooks'
import { UserAvatar } from './UserAvatar.component'
import { LoadingSpinner } from './LoadingSpinner.component'
import { ConfirmModal } from '../../../ui'

export const CommentItem = memo<CommentItemProps>(({ 
  comment, 
  onLike, 
  onEdit, 
  onDelete, 
  currentUserId,
  isAuthenticated 
}) => {
  const { formatDate } = useCommentUtils()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  
  const isOwner = currentUserId === comment.user.id
  const canInteract = isAuthenticated
  const isEdited = comment.updatedAt && comment.updatedAt !== comment.createdAt
  


  const {
    isEditing,
    editContent,
    setEditContent,
    startEdit,
    cancelEdit,
    handleEdit,
    handleDelete,
    handleLike,
    isPending
  } = useCommentItem({
    commentId: comment.id,
    initialContent: comment.content,
    isOwner,
    onEdit,
    onDelete,
    onLike
  })

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = () => {
    handleDelete()
    setShowDeleteModal(false)
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-java-dark-surface rounded-lg p-4 border border-java-orange/10 shadow-sm"
    >
      <div className="flex items-start space-x-3">
        <UserAvatar username={comment.user.username} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="text-sm font-semibold text-java-gray dark:text-java-dark-text">
              {comment.user.username}
            </h4>
            <span className="text-xs text-java-blue/70 dark:text-java-dark-text-secondary">
              {formatDate(comment.createdAt)}
            </span>
            
            {isEdited && (
              <span className="text-xs bg-java-orange/10 text-java-orange px-2 py-0.5 rounded-full">
                Edytowano
              </span>
            )}
            
            {isOwner && (
              <div className="flex items-center space-x-1 ml-auto">
                <button
                  onClick={isEditing ? cancelEdit : startEdit}
                  className="text-xs text-java-blue hover:text-java-orange transition-colors cursor-pointer
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isPending}
                >
                  {isEditing ? 'Anuluj' : 'Edytuj'}
                </button>
                <span className="text-xs text-gray-300">•</span>
                <button
                  onClick={handleDeleteClick}
                  className="text-xs text-red-500 hover:text-red-600 transition-colors cursor-pointer
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isPending}
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
                disabled={isPending}
                aria-label="Edytuj komentarz"
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={cancelEdit}
                  className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors cursor-pointer
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isPending}
                >
                  Anuluj
                </button>
                <button
                  onClick={handleEdit}
                  disabled={!editContent.trim() || isPending}
                  className="px-3 py-1 text-xs bg-java-orange hover:bg-java-red text-white rounded-md transition-colors cursor-pointer
                           disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center space-x-1"
                >
                  {isPending && <LoadingSpinner size="sm" className="border-white" />}
                  <span>{isPending ? 'Zapisywanie...' : 'Zapisz'}</span>
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
              onClick={handleLike}
              disabled={!canInteract || isPending}
              className={`flex items-center space-x-1 text-xs transition-colors
                         disabled:cursor-not-allowed ${
                canInteract 
                  ? comment.isLikedByCurrentUser
                    ? 'text-red-500 hover:text-red-600 cursor-pointer'
                    : 'text-java-blue/70 hover:text-red-500 cursor-pointer'
                  : 'text-gray-400'
              }`}
              aria-label={comment.isLikedByCurrentUser ? 'Usuń polubienie' : 'Polub komentarz'}
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
      
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Usuń komentarz"
        message="Czy na pewno chcesz usunąć ten komentarz? Ta akcja jest nieodwracalna."
        confirmText="Usuń"
        cancelText="Anuluj"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={isPending}
      />
    </motion.div>
  )
})

CommentItem.displayName = 'CommentItem' 