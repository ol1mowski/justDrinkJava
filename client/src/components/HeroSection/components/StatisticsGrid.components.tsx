import { memo } from 'react'
import { 
  DocumentTextIcon, 
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'

interface Statistic {
  id: string
  icon: React.ComponentType<{ className?: string }>
  value: string
  label: string
  color: 'orange' | 'red' | 'blue'
  growth?: string
}

const statistics: Statistic[] = [
  {
    id: '1',
    icon: DocumentTextIcon,
    value: '250+',
    label: 'Artykułów',
    color: 'orange',
    growth: '+12%'
  },
  {
    id: '2',
    icon: QuestionMarkCircleIcon,
    value: '1.2k',
    label: 'Quizów',
    color: 'blue',
    growth: '+28%'
  },
]

const getStatisticStyles = (color: Statistic['color']) => {
  const styles = {
    orange: {
      bg: 'bg-java-orange/10 dark:bg-java-orange/20',
      icon: 'text-java-orange',
      value: 'text-java-orange',
      growth: 'text-java-orange bg-java-orange/10'
    },
    red: {
      bg: 'bg-java-red/10 dark:bg-java-red/20',
      icon: 'text-java-red',
      value: 'text-java-red',
      growth: 'text-java-red bg-java-red/10'
    },
    blue: {
      bg: 'bg-java-blue/10 dark:bg-java-blue/20',
      icon: 'text-java-blue',
      value: 'text-java-blue',
      growth: 'text-java-blue bg-java-blue/10'
    }
  }
  return styles[color]
}

export const StatisticsGrid = memo(() => {
  return (
    <div className="bg-java-white dark:bg-java-dark-surface rounded-2xl p-6 sm:p-8 
                   border border-java-gray/10 dark:border-java-dark-text/10">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-java-gray dark:text-java-dark-text mb-2">
          Nasza społeczność
        </h3>
        <p className="text-sm text-java-blue/90 dark:text-java-dark-text-secondary">
          Dołącz do tysięcy developerów Java
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {statistics.map((stat) => {
          const styles = getStatisticStyles(stat.color)
          const IconComponent = stat.icon
          
          return (
            <div key={stat.id} 
                 className="group relative p-4 rounded-xl border border-java-gray/10 dark:border-java-dark-text/10
                           hover:border-java-orange/30 dark:hover:border-java-orange/30
                           transition-all duration-300 hover:shadow-lg hover:shadow-java-orange/10
                           hover:-translate-y-1 cursor-pointer">
              <div className={`absolute inset-0 ${styles.bg} rounded-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />
              <div className="relative">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg mb-3
                               bg-java-white dark:bg-java-dark-bg shadow-sm">
                  <IconComponent className={`w-5 h-5 ${styles.icon}`} />
                </div>
                <div className={`text-2xl font-bold ${styles.value} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-java-blue/90 dark:text-java-dark-text-secondary mb-2">
                  {stat.label}
                </div>
                {stat.growth && (
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles.growth}`}>
                    ↗ {stat.growth}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-java-gray/10 dark:border-java-dark-text/10">
        <button className="w-full py-3 text-sm font-medium text-java-orange hover:text-java-red 
                         transition-colors duration-200 hover:bg-java-orange/5 rounded-lg
                         cursor-pointer">
          Dołącz do nas już dziś! 🚀
        </button>
      </div>
    </div>
  )
})

StatisticsGrid.displayName = 'StatisticsGrid' 