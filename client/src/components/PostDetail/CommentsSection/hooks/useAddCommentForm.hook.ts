import { useState, useCallback, useTransition } from 'react';
import toast from 'react-hot-toast';

export interface UseAddCommentFormOptions {
  onSubmit: (content: string) => Promise<void>;
  maxLength?: number;
}

export interface UseAddCommentFormResult {
  content: string;
  setContent: (content: string) => void;
  isValid: boolean;
  characterCount: number;
  maxLength: number;
  handleSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  reset: () => void;
}

export const useAddCommentForm = (
  options: UseAddCommentFormOptions
): UseAddCommentFormResult => {
  const { onSubmit, maxLength = 2000 } = options;

  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();

  const isValid = content.trim().length > 0 && content.length <= maxLength;
  const characterCount = content.length;

  const reset = useCallback(() => {
    setContent('');
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!isValid || isPending) return;

      startTransition(() => {
        onSubmit(content.trim())
          .then(() => {
            reset();
            toast.success('Komentarz został dodany!');
          })
          .catch(error => {
            console.error('Błąd podczas dodawania komentarza:', error);
            toast.error('Nie udało się dodać komentarza');
          });
      });
    },
    [content, isValid, isPending, onSubmit, reset]
  );

  return {
    content,
    setContent,
    isValid,
    characterCount,
    maxLength,
    handleSubmit,
    isPending,
    reset,
  };
};
