import { memo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  confirmButtonClass?: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export const ConfirmModal = memo<ConfirmModalProps>(({
  isOpen,
  title,
  message,
  confirmText = 'Potwierdź',
  cancelText = 'Anuluj',
  confirmButtonClass = 'bg-red-500 hover:bg-red-600 focus:ring-red-500',
  onConfirm,
  onCancel,
  isLoading = false
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onCancel()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, isLoading, onCancel])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
            onClick={!isLoading ? onCancel : undefined}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative bg-white dark:bg-java-dark-surface rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            <button
              onClick={!isLoading ? onCancel : undefined}
              disabled={isLoading}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                       transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Zamknij"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-java-gray dark:text-java-dark-text">
                  {title}
                </h3>
              </div>
              
              <p className="text-sm text-java-blue/80 dark:text-java-dark-text-secondary mb-6 leading-relaxed">
                {message}
              </p>

              <div className="flex space-x-3 justify-end">
                <button
                  onClick={onCancel}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                           bg-gray-100 dark:bg-java-dark-bg hover:bg-gray-200 dark:hover:bg-java-dark-border
                           border border-gray-300 dark:border-java-dark-border rounded-lg
                           transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50
                           focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  {cancelText}
                </button>
                
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors
                           cursor-pointer disabled:cursor-not-allowed disabled:opacity-50
                           focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center space-x-2
                           ${confirmButtonClass}`}
                >
                  {isLoading && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  <span>{isLoading ? 'Usuwanie...' : confirmText}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
})

ConfirmModal.displayName = 'ConfirmModal' 