import { memo } from 'react'
import { HashtagIcon } from '@heroicons/react/24/outline'
import type { HashtagDto } from '../types'

interface HashtagFilterProps {
  hashtags: HashtagDto[]
  selectedHashtags: string[]
  onHashtagToggle: (hashtagName: string) => void
}

export const HashtagFilter = memo<HashtagFilterProps>(({
  hashtags,
  selectedHashtags,
  onHashtagToggle
}) => {
  return (
    <div>
      <h4 className="flex items-center gap-2 font-semibold text-java-gray dark:text-java-dark-text mb-3">
        <HashtagIcon className="w-5 h-5 text-java-orange" />
        Hashtagi
      </h4>
      <div className="flex flex-wrap gap-2">
        {hashtags.slice(0, 12).map(hashtag => (
          <button
            key={hashtag.id}
            onClick={() => onHashtagToggle(hashtag.name)}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 hover:shadow-md ${
              selectedHashtags.includes(hashtag.name)
                ? 'bg-java-orange text-white shadow-md hover:bg-java-orange/90'
                : 'bg-java-white dark:bg-java-dark-surface text-java-gray dark:text-java-dark-text border border-java-light-gray/30 dark:border-java-dark-surface/50 hover:border-java-orange hover:text-java-orange hover:bg-java-orange/5'
            }`}
          >
            <span>#{hashtag.name}</span>
            <span className="text-xs opacity-70">
              ({hashtag.postCount})
            </span>
          </button>
        ))}
      </div>
    </div>
  )
})

HashtagFilter.displayName = 'HashtagFilter' 