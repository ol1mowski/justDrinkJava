import { memo } from 'react'
import { HashtagIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { LoadingState } from '../../ui'

interface HashtagsLoadingStateProps {
  itemsCount?: number
}

export const HashtagsLoadingState = memo<HashtagsLoadingStateProps>(({ itemsCount = 10 }) => {
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
        <ChartBarIcon className="w-5 h-5 text-java-orange animate-pulse" />
      </div>
      
      <LoadingState message="Ładowanie hashtagów...">
        <div className="space-y-4">
          {[...Array(itemsCount)].map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-6 h-6 rounded-full bg-java-gray/20 animate-pulse"></div>
                <div className="h-8 bg-java-gray/20 rounded-lg animate-pulse flex-1 max-w-32"></div>
              </div>
              <div className="w-16 h-4 bg-java-gray/20 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </LoadingState>
    </div>
  )
})

HashtagsLoadingState.displayName = 'HashtagsLoadingState' 