import { useState, useCallback, useTransition } from 'react';
import toast from 'react-hot-toast';

export interface UseCommentItemOptions {
  commentId: number;
  initialContent: string;
  isOwner: boolean;
  onEdit?: (id: number, content: string) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
  onLike?: (id: number) => Promise<void>;
}

export interface UseCommentItemResult {
  isEditing: boolean;
  editContent: string;
  setEditContent: (content: string) => void;
  startEdit: () => void;
  cancelEdit: () => void;

  handleEdit: () => void;
  handleDelete: () => void;
  handleLike: () => void;

  isPending: boolean;
}

export const useCommentItem = (
  options: UseCommentItemOptions
): UseCommentItemResult => {
  const { commentId, initialContent, isOwner, onEdit, onDelete, onLike } =
    options;

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(initialContent);
  const [isPending, startTransition] = useTransition();

  const startEdit = useCallback(() => {
    setIsEditing(true);
    setEditContent(initialContent);
  }, [initialContent]);

  const cancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditContent(initialContent);
  }, [initialContent]);

  const handleEdit = useCallback(() => {
    if (!onEdit || !editContent.trim() || !isOwner) return;

    startTransition(() => {
      onEdit(commentId, editContent.trim())
        .then(() => {
          setIsEditing(false);
          toast.success('Komentarz został zaktualizowany!');
        })
        .catch(error => {
          console.error('Błąd podczas edycji komentarza:', error);
          toast.error('Nie udało się zaktualizować komentarza');
        });
    });
  }, [onEdit, editContent, commentId, isOwner]);

  const handleDelete = useCallback(() => {
    if (!onDelete || !isOwner) return;

    startTransition(() => {
      onDelete(commentId)
        .then(() => {
          toast.success('Komentarz został usunięty!');
        })
        .catch(error => {
          console.error('Błąd podczas usuwania komentarza:', error);
          toast.error('Nie udało się usunąć komentarza');
        });
    });
  }, [onDelete, commentId, isOwner]);

  const handleLike = useCallback(() => {
    if (!onLike) return;

    startTransition(() => {
      onLike(commentId)
        .then(() => {})
        .catch(error => {
          console.error('Błąd podczas lajkowania komentarza:', error);
          toast.error('Nie udało się polubić komentarza');
        });
    });
  }, [onLike, commentId]);

  return {
    isEditing,
    editContent,
    setEditContent,
    startEdit,
    cancelEdit,
    handleEdit,
    handleDelete,
    handleLike,
    isPending,
  };
};
