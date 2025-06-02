import { useState, useCallback } from 'react'

export interface AppError {
  message: string
  code?: string
  details?: unknown
  timestamp: number
}

export const useErrorHandler = () => {
  const [error, setError] = useState<AppError | null>(null)

  const handleError = useCallback((error: unknown, code?: string) => {
    const appError: AppError = {
      message: error instanceof Error ? error.message : 'Nieznany błąd',
      code,
      details: error,
      timestamp: Date.now()
    }
    
    console.error('Error handled:', appError)
    setError(appError)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  const withErrorHandling = useCallback(
    <T extends unknown[], R>(fn: (...args: T) => Promise<R>) => {
      return async (...args: T): Promise<R | undefined> => {
        try {
          return await fn(...args)
        } catch (err) {
          handleError(err)
          return undefined
        }
      }
    },
    [handleError]
  )

  return {
    error,
    hasError: !!error,
    handleError,
    clearError,
    resetError,
    withErrorHandling
  }
} 