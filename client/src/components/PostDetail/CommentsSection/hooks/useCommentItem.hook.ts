import { useState, useCallback, useTransition } from 'react'

export interface UseCommentItemOptions {
  commentId: number
  initialContent: string
  isOwner: boolean
  onEdit?: (id: number, content: string) => Promise<void>
  onDelete?: (id: number) => Promise<void>
  onLike?: (id: number) => Promise<void>
}

export interface UseCommentItemResult {
  isEditing: boolean
  editContent: string
  setEditContent: (content: string) => void
  startEdit: () => void
  cancelEdit: () => void
  
  handleEdit: () => Promise<void>
  handleDelete: () => Promise<void>
  handleLike: () => Promise<void>
  
  isPending: boolean
}

export const useCommentItem = (options: UseCommentItemOptions): UseCommentItemResult => {
  const {
    commentId,
    initialContent,
    isOwner,
    onEdit,
    onDelete,
    onLike
  } = options

  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(initialContent)
  const [isPending, startTransition] = useTransition()

  const startEdit = useCallback(() => {
    setIsEditing(true)
    setEditContent(initialContent)
  }, [initialContent])

  const cancelEdit = useCallback(() => {
    setIsEditing(false)
    setEditContent(initialContent)
  }, [initialContent])

  const handleEdit = useCallback(async () => {
    if (!onEdit || !editContent.trim() || !isOwner) return

    startTransition(async () => {
      try {
        await onEdit(commentId, editContent.trim())
        setIsEditing(false)
      } catch (error) {
        console.error('Błąd podczas edycji komentarza:', error)
      }
    })
  }, [onEdit, editContent, commentId, isOwner])

  const handleDelete = useCallback(async () => {
    if (!onDelete || !isOwner) return
    
    const confirmed = window.confirm('Czy na pewno chcesz usunąć ten komentarz?')
    if (!confirmed) return

    startTransition(async () => {
      try {
        await onDelete(commentId)
      } catch (error) {
        console.error('Błąd podczas usuwania komentarza:', error)
      }
    })
  }, [onDelete, commentId, isOwner])

  const handleLike = useCallback(async () => {
    if (!onLike) return

    startTransition(async () => {
      try {
        await onLike(commentId)
      } catch (error) {
        console.error('Błąd podczas lajkowania komentarza:', error)
      }
    })
  }, [onLike, commentId])

  return {
    isEditing,
    editContent,
    setEditContent,
    startEdit,
    cancelEdit,
    handleEdit,
    handleDelete,
    handleLike,
    isPending
  }
} 