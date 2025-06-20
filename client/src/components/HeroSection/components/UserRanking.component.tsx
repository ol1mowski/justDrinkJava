import { memo, useEffect } from 'react'
import { useRanking } from '../../../hooks/useRanking.hook'
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
  const { topRankings, loading, error, getTopRankings } = useRanking()

  useEffect(() => {
    getTopRankings(limit)
  }, [getTopRankings, limit])

  if (loading) {
    return <UserRankingLoadingState limit={limit} />
  }

  if (error) {
    return <UserRankingErrorState onRetry={() => getTopRankings(limit)} />
  }

  if (!topRankings || topRankings.length === 0) {
    return <UserRankingEmptyState />
  }

  return <UserRankingList users={topRankings} />
})

UserRanking.displayName = 'UserRanking' 