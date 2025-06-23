import { memo } from 'react';
import { motion } from 'framer-motion';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import type { AddCommentFormProps } from '../types';
import { useAddCommentForm } from '../hooks';
import { UserAvatar } from './UserAvatar.component';
import { LoadingSpinner } from './LoadingSpinner.component';

export const AddCommentForm = memo<AddCommentFormProps>(
  ({ onSubmit, currentUser, isLoading }) => {
    const {
      content,
      setContent,
      isValid,
      characterCount,
      maxLength,
      handleSubmit,
      isPending,
    } = useAddCommentForm({ onSubmit });

    const isTextareaDisabled = isPending || isLoading;
    const isSubmitDisabled = isPending || isLoading || !isValid;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-java-dark-surface rounded-lg p-4 border border-java-orange/20 shadow-sm"
      >
        <div className="flex items-start space-x-3">
          <UserAvatar username={currentUser?.username || ''} />

          <form onSubmit={handleSubmit} className="flex-1">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Napisz komentarz..."
              className="w-full p-3 border border-java-light-gray/30 rounded-lg resize-none focus:outline-none 
                     focus:ring-2 focus:ring-java-orange/50 focus:border-java-orange
                     dark:bg-java-dark-bg dark:border-java-dark-border dark:text-java-dark-text
                     dark:placeholder-java-dark-text-secondary"
              rows={3}
              disabled={isTextareaDisabled}
              maxLength={maxLength}
              aria-label="Napisz komentarz"
            />

            <div className="flex justify-between items-center mt-3">
              <span
                className={`text-xs ${
                  characterCount > maxLength * 0.9
                    ? 'text-red-500'
                    : 'text-java-blue/70 dark:text-java-dark-text-secondary'
                }`}
              >
                {characterCount}/{maxLength} znaków
              </span>

              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-java-orange hover:bg-java-red 
                       text-white font-medium rounded-lg transition-colors duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       focus:outline-none focus:ring-2 focus:ring-java-orange/50"
                aria-label="Dodaj komentarz"
              >
                {isPending ? (
                  <>
                    <LoadingSpinner size="sm" className="border-white" />
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
    );
  }
);

AddCommentForm.displayName = 'AddCommentForm';
