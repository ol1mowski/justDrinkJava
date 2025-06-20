import { memo } from 'react'

export const UserRankingEmptyState = memo(() => {
  return (
    <div className="text-center py-6">
      <p className="text-gray-500 text-sm">Brak danych rankingu</p>
    </div>
  )
})

UserRankingEmptyState.displayName = 'UserRankingEmptyState' 