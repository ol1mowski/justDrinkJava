import { memo } from 'react'
import { FunnelIcon } from '@heroicons/react/24/outline'

interface FilterButtonProps {
  activeCount: number
  onClick: () => void
}

export const FilterButton = memo<FilterButtonProps>(({ activeCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 bg-java-orange text-white shadow-lg hover:bg-java-orange/90 hover:shadow-xl cursor-pointer transform hover:-translate-y-0.5"
    >
      <FunnelIcon className="w-5 h-5 text-white" />
      <span>Filtry</span>
      {activeCount > 0 && (
        <span className="bg-white/20 text-xs px-2 py-1 rounded-full text-white">
          {activeCount}
        </span>
      )}
    </button>
  )
})

FilterButton.displayName = 'FilterButton' 