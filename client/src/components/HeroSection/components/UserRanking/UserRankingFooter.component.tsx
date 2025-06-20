import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

export const UserRankingFooter = memo(() => {
  const navigate = useNavigate()

  return (
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
  )
})

UserRankingFooter.displayName = 'UserRankingFooter' 