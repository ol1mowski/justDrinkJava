import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayIcon, BookOpenIcon, UsersIcon } from '@heroicons/react/24/outline'

export const CallToAction = memo(() => {
  const navigate = useNavigate()

  const handleStartLearning = () => {
    navigate('/posts')
  }

  const handleBrowseCourses = () => {
    navigate('/posts')
  }

  const handleCommunity = () => {
    navigate('/about')
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
      <button 
        onClick={handleStartLearning}
        className="group flex-1 bg-gradient-to-r from-java-orange to-java-red 
                       hover:from-java-red hover:to-java-orange
                       text-white font-semibold px-6 py-4 rounded-xl 
                       shadow-lg hover:shadow-xl hover:shadow-java-orange/25
                       transition-all duration-300 hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-java-orange/50 focus:ring-offset-2
                       cursor-pointer">
        <div className="flex items-center justify-center gap-3">
          <PlayIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-lg">Rozpocznij naukę</span>
        </div>
      </button>

      <button 
        onClick={handleBrowseCourses}
        className="group flex-1 bg-java-white 
                       border-2 border-java-orange text-java-orange
                       hover:bg-java-orange hover:text-white
                       font-semibold px-6 py-4 rounded-xl 
                       shadow-lg hover:shadow-xl hover:shadow-java-orange/25
                       transition-all duration-300 hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-java-orange/50 focus:ring-offset-2
                       cursor-pointer">
        <div className="flex items-center justify-center gap-3">
          <BookOpenIcon className="w-5 h-5 group-hover:scale-110 transition-all duration-200" />
          <span className="text-lg">Przeglądaj artykuły</span>
        </div>
      </button>

      <button 
        onClick={handleCommunity}
        className="group sm:flex-initial bg-java-blue hover:bg-java-blue/90
                       text-white font-medium px-4 py-4 sm:px-6 rounded-xl 
                       shadow-lg hover:shadow-xl hover:shadow-java-blue/25
                       transition-all duration-300 hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-java-blue/50 focus:ring-offset-2
                       cursor-pointer">
        <div className="flex items-center justify-center gap-2">
          <UsersIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          <span className="hidden sm:inline">O nas</span>
        </div>
      </button>
    </div>
  )
})

CallToAction.displayName = 'CallToAction' 