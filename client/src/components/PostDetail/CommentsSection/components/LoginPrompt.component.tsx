import { memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import type { LoginPromptProps } from '../types'

export const LoginPrompt = memo<LoginPromptProps>(({ onAuthRedirect }) => {
  const handleLogin = useCallback(() => {
    if (onAuthRedirect) {
      onAuthRedirect()
    } else {
      window.location.href = '/auth'
    }
  }, [onAuthRedirect])

  const handleRegister = useCallback(() => {
    if (onAuthRedirect) {
      onAuthRedirect()
    } else {
      window.location.href = '/auth'
    }
  }, [onAuthRedirect])

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
          onClick={handleLogin}
          className="inline-flex items-center justify-center px-6 py-2 bg-java-orange hover:bg-java-red 
                   text-white font-medium rounded-lg transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-java-orange/50"
          aria-label="Przejdź do logowania"
        >
          Zaloguj się
        </button>
        <button
          onClick={handleRegister}
          className="inline-flex items-center justify-center px-6 py-2 bg-white hover:bg-java-light-gray 
                   text-java-gray font-medium rounded-lg transition-colors duration-200 
                   border border-java-light-gray/30
                   focus:outline-none focus:ring-2 focus:ring-java-orange/50"
          aria-label="Przejdź do rejestracji"
        >
          Zarejestruj się
        </button>
      </div>
    </motion.div>
  )
})

LoginPrompt.displayName = 'LoginPrompt' 