import { memo } from 'react'
import { HashtagIcon, ChartBarIcon } from '@heroicons/react/24/outline'

interface Tag {
  id: string
  name: string
  count: number
  color: 'orange' | 'red' | 'blue'
  trending?: boolean
}

const popularTags: Tag[] = [
  { id: '1', name: 'Spring Boot', count: 156, color: 'orange', trending: true },
  { id: '2', name: 'React', count: 134, color: 'blue' },
  { id: '3', name: 'Java 21', count: 98, color: 'red', trending: true },
  { id: '4', name: 'Microservices', count: 87, color: 'orange' },
  { id: '5', name: 'Docker', count: 76, color: 'blue' },
  { id: '6', name: 'PostgreSQL', count: 65, color: 'red' },
  { id: '7', name: 'Kubernetes', count: 54, color: 'blue' },
  { id: '8', name: 'Security', count: 43, color: 'orange' },
  { id: '9', name: 'Testing', count: 38, color: 'red' },
  { id: '10', name: 'Performance', count: 32, color: 'blue' }
]

const getTagStyles = (color: Tag['color']) => {
  const styles = {
    orange: 'bg-java-orange/10 text-java-orange border-java-orange/20 hover:bg-java-orange hover:text-white',
    red: 'bg-java-red/10 text-java-red border-java-red/20 hover:bg-java-red hover:text-white',
    blue: 'bg-java-blue/10 text-java-blue border-java-blue/20 hover:bg-java-blue hover:text-white'
  }
  return styles[color]
}

export const PopularTags = memo(() => {
  return (
    <div className="bg-java-white dark:bg-java-dark-surface rounded-2xl p-6 sm:p-8 
                   border border-java-gray/10 dark:border-java-dark-text/10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-java-orange/10 rounded-lg">
            <HashtagIcon className="w-5 h-5 text-java-orange" />
          </div>
          <h3 className="text-xl font-bold text-java-gray dark:text-java-dark-text">
            Popularne tematy
          </h3>
        </div>
        <ChartBarIcon className="w-5 h-5 text-java-orange" />
      </div>

      <div className="space-y-4">
        {popularTags.map((tag, index) => (
          <div key={tag.id} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-java-gray/10 dark:bg-java-dark-text/10 
                             flex items-center justify-center text-xs font-bold text-java-blue/90 dark:text-java-dark-text-secondary">
                {index + 1}
              </div>
              <button className={`
                inline-flex items-center gap-2 px-3 py-2 rounded-lg border font-medium text-sm
                transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
                cursor-pointer
                ${getTagStyles(tag.color)}
              `}>
                <span>#</span>
                <span>{tag.name}</span>
                {tag.trending && <ChartBarIcon className="w-3 h-3 text-current" />}
              </button>
            </div>
            <div className="flex-shrink-0 text-right">
              <span className="text-sm font-medium text-java-blue/90 dark:text-java-dark-text-secondary">
                {tag.count} postów
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-java-gray/10 dark:border-java-dark-text/10">
        <button className="w-full py-3 text-sm font-medium text-java-orange hover:text-java-red 
                         transition-colors duration-200 hover:bg-java-orange/5 rounded-lg
                         cursor-pointer">
          Zobacz wszystkie tematy →
        </button>
      </div>
    </div>
  )
})

PopularTags.displayName = 'PopularTags' 