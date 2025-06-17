import { memo } from 'react'

export const EmptyState = memo(() => {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-java-orange/10 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg className="w-12 h-12 text-java-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-java-gray dark:text-java-dark-text mb-2">
          Brak postów
        </h3>
        <p className="text-java-blue/90 dark:text-java-dark-text-secondary">
          Nie znaleźliśmy postów spełniających Twoje kryteria wyszukiwania. Spróbuj zmienić filtry lub wyszukiwane frazy.
        </p>
      </div>
    </div>
  )
})

EmptyState.displayName = 'EmptyState' 