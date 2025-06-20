import { memo } from 'react'
import { UserRankingItem } from './UserRankingItem.component'
import { UserRankingFooter } from './UserRankingFooter.component'
import type { UserRankingDto } from '../../../../api/ranking.api'

interface UserRankingListProps {
  users: UserRankingDto[]
  isAuthenticated: boolean
}

export const UserRankingList = memo<UserRankingListProps>(({ users, isAuthenticated }) => {
  return (
    <div className="space-y-3">
      {users.map((user) => (
        <UserRankingItem key={user.userId} user={user} />
      ))}
      <UserRankingFooter isAuthenticated={isAuthenticated} />
    </div>
  )
})

UserRankingList.displayName = 'UserRankingList' 