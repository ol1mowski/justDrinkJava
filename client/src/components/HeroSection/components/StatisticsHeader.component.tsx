import { memo } from 'react'

export const StatisticsHeader = memo(() => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-java-gray dark:text-java-dark-text mb-2">
        Nasza społeczność
      </h3>
      <p className="text-sm text-java-blue/90 dark:text-java-dark-text-secondary">
        Dołącz do developerów Java
      </p>
    </div>
  )
})

StatisticsHeader.displayName = 'StatisticsHeader' 