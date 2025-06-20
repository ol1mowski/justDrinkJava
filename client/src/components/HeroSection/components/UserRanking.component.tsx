import { memo, useEffect } from 'react'
import { useRanking } from '../../../hooks/useRanking.hook'
import { useAuth } from '../../../hooks/auth/useAuth.hook'
import {
  UserRankingLoadingState,
  UserRankingErrorState,
  UserRankingEmptyState,
  UserRankingList
} from './UserRanking'

interface UserRankingProps {
  limit?: number
}

export const UserRanking = memo<UserRankingProps>(({ limit = 5 }) => {
  const { isAuthenticated } = useAuth()
  const { topRankings, loading, error, getTopRankings } = useRanking()
  
  const effectiveLimit = isAuthenticated ? limit : 3

  useEffect(() => {
    getTopRankings(effectiveLimit)
  }, [getTopRankings, effectiveLimit])

  if (loading) {
    return <UserRankingLoadingState limit={effectiveLimit} />
  }

  if (error) {
    return <UserRankingErrorState onRetry={() => getTopRankings(effectiveLimit)} />
  }

  if (!topRankings || topRankings.length === 0) {
    return <UserRankingEmptyState />
  }

  return <UserRankingList users={topRankings} isAuthenticated={isAuthenticated} />
})

UserRanking.displayName = 'UserRanking' 