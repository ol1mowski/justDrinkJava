import { memo } from 'react'
import { TrophyIcon, StarIcon, FireIcon } from '@heroicons/react/24/solid'
import { UserIcon } from '@heroicons/react/24/outline'

interface RankingUser {
  id: number
  username: string
  points: number
  quizzesCompleted: number
  avatar?: string
  rank: number
}

interface UserRankingProps {
  users?: RankingUser[]
}

const defaultUsers: RankingUser[] = [
  {
    id: 1,
    username: "JavaMaster",
    points: 2850,
    quizzesCompleted: 45,
    rank: 1
  },
  {
    id: 2,
    username: "SpringDev",
    points: 2340,
    quizzesCompleted: 38,
    rank: 2
  },
  {
    id: 3,
    username: "CodeNinja",
    points: 1920,
    quizzesCompleted: 32,
    rank: 3
  },
  {
    id: 4,
    username: "ByteHunter",
    points: 1650,
    quizzesCompleted: 28,
    rank: 4
  },
  {
    id: 5,
    username: "DevGuru",
    points: 1420,
    quizzesCompleted: 24,
    rank: 5
  }
]

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

export const UserRanking = memo<UserRankingProps>(({ users = defaultUsers }) => {
  return (
    <div className="space-y-3">
      {users.map((user) => (
        <div
          key={user.id}
          className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${getRankColor(user.rank)}`}
        >
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {getRankIcon(user.rank)}
              <span className="font-semibold text-gray-700 text-sm">
                #{user.rank}
              </span>
            </div>
            
            <div className="w-8 h-8 bg-java-orange rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <UserIcon className="w-4 h-4 text-white" />
              )}
            </div>
            
            <div>
              <div className="font-medium text-gray-800 text-sm">
                {user.username}
              </div>
              <div className="text-xs text-gray-500">
                {user.quizzesCompleted} quizów
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="font-bold text-java-orange text-sm">
              {user.points.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">
              punktów
            </div>
          </div>
        </div>
      ))}
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="text-center">
          <button className="text-xs text-java-orange hover:text-java-red font-medium transition-colors">
            Zobacz pełny ranking →
          </button>
        </div>
      </div>
    </div>
  )
})

UserRanking.displayName = 'UserRanking' 