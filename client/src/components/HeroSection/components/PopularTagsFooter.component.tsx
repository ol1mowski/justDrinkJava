import { memo } from 'react'

export const PopularTagsFooter = memo(() => {
  return (
    <div className="mt-6 pt-4 border-t border-java-gray/10 dark:border-java-dark-text/10">
      <button className="w-full py-3 text-sm font-medium text-java-orange hover:text-java-red 
                       transition-colors duration-200 hover:bg-java-orange/5 rounded-lg
                       cursor-pointer focus:outline-none focus:ring-2 focus:ring-java-orange/50">
        Zobacz wszystkie tematy →
      </button>
    </div>
  )
})

PopularTagsFooter.displayName = 'PopularTagsFooter' 