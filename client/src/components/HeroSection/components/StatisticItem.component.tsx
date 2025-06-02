import { memo } from 'react'

interface Statistic {
  id: string
  icon: React.ComponentType<{ className?: string }>
  value: string
  label: string
  color: 'orange' | 'red' | 'blue'
  growth?: string
}

interface StatisticItemProps {
  statistic: Statistic
}

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

export const StatisticItem = memo<StatisticItemProps>(({ statistic }) => {
  const styles = getStatisticStyles(statistic.color)
  const IconComponent = statistic.icon
  
  return (
    <div className="group relative p-4 rounded-xl border border-java-gray/10 dark:border-java-dark-text/10
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
          {statistic.value}
        </div>
        <div className="text-sm text-java-blue/90 dark:text-java-dark-text-secondary mb-2">
          {statistic.label}
        </div>
        {statistic.growth && (
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles.growth}`}>
            ↗ {statistic.growth}
          </div>
        )}
      </div>
    </div>
  )
})

StatisticItem.displayName = 'StatisticItem'

export type { Statistic } 