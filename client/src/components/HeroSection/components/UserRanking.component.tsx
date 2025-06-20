import { memo, useEffect } from 'react'
import { TrophyIcon, StarIcon, FireIcon } from '@heroicons/react/24/solid'
import { UserIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useRanking } from '../../../hooks/useRanking.hook'
import type { UserRankingDto } from '../../../api/ranking.api'

interface UserRankingProps {
  limit?: number
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <TrophyIcon className="w-5 h-5 text-yellow-500" />
    case 2:
      return <StarIcon className="w-5 h-5 text-gray-400" />
    case 3:
      return <FireIcon className="w-5 h-5 text-orange-500" />
    default:
      return (
        <div className="w-5 h-5 rounded-full bg-java-orange text-white text-xs font-bold flex items-center justify-center">
          {rank}
        </div>
      )
  }
}

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200'
    case 2:
      return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
    case 3:
      return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200'
    default:
      return 'bg-gray-50 border-gray-200'
  }
}

export const UserRanking = memo<UserRankingProps>(({ limit = 5 }) => {
  const navigate = useNavigate()
  const { topRankings, loading, error, getTopRankings } = useRanking()

  useEffect(() => {
    getTopRankings(limit)
  }, [getTopRankings, limit])

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: limit }).map((_, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50 animate-pulse">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="space-y-1">
                <div className="w-20 h-3 bg-gray-300 rounded"></div>
                <div className="w-16 h-2 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="w-12 h-3 bg-gray-300 rounded"></div>
              <div className="w-10 h-2 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 text-sm mb-2">Nie udało się załadować rankingu</p>
        <button 
          onClick={() => getTopRankings(limit)}
          className="text-xs text-java-orange hover:text-java-red font-medium transition-colors"
        >
          Spróbuj ponownie
        </button>
      </div>
    )
  }

  if (!topRankings || topRankings.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 text-sm">Brak danych rankingu</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {topRankings.map((user: UserRankingDto) => (
        <div
          key={user.userId}
          className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${getRankColor(user.ranking)}`}
        >
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {getRankIcon(user.ranking)}
              <span className="font-semibold text-gray-700 text-sm">
                #{user.ranking}
              </span>
            </div>
            
            <div className="w-8 h-8 bg-java-orange rounded-full flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-white" />
            </div>
            
            <div>
              <div className="font-medium text-gray-800 text-sm">
                {user.username || 'Użytkownik'}
              </div>
              <div className="text-xs text-gray-500">
                {user.totalScore} pkt
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="font-bold text-java-orange text-sm">
              {user.totalScore.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">
              punktów
            </div>
          </div>
        </div>
      ))}
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="text-center">
          <button 
            onClick={() => navigate('/ranking')}
            className="text-xs text-java-orange hover:text-java-red font-medium transition-colors"
          >
            Zobacz pełny ranking →
          </button>
        </div>
      </div>
    </div>
  )
})

UserRanking.displayName = 'UserRanking' 