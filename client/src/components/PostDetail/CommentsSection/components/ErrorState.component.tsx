import { memo } from 'react'
import { motion } from 'framer-motion'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import type { ErrorStateProps } from '../types'

export const ErrorState = memo<ErrorStateProps>(({ error, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 border border-red-200 rounded-lg p-6 text-center
                 dark:bg-red-900/20 dark:border-red-800/50"
    >
      <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-3" />
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
        Błąd podczas ładowania komentarzy
      </h3>
      <p className="text-red-600 dark:text-red-300 mb-4 max-w-md mx-auto">
        {error}
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 
                 text-white font-medium rounded-lg transition-colors
                 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        aria-label="Spróbuj ponownie załadować komentarze"
      >
        Spróbuj ponownie
      </button>
    </motion.div>
  )
})

ErrorState.displayName = 'ErrorState' 