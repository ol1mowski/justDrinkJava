import { memo } from 'react'
import { useAuthStatus } from '../../../hooks/useAuthStatus.hook'
import { CVCareerTipsAuthenticated } from './CVCareerTipsAuthenticated.component'
import { CVCareerTipsUnauthenticated } from './CVCareerTipsUnauthenticated.component'

export const CVCareerTipsSection = memo(() => {
  const { isAuthenticated, user, isLoading } = useAuthStatus()

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-gray-600">Sprawdzanie statusu logowania...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          ☕ Jak dostać pracę w IT?
        </h2>
        <p className="text-lg text-gray-600">
          10 sprawdzonych porad od doświadczonych programistów
        </p>
      </div>

      {isAuthenticated && user ? (
        <CVCareerTipsAuthenticated user={user} />
      ) : (
        <CVCareerTipsUnauthenticated />
      )}
    </div>
  )
})

CVCareerTipsSection.displayName = 'CVCareerTipsSection' 