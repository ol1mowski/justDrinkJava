import { useState, useTransition, memo } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export const SearchBar = memo(() => {
  const [isPending, startTransition] = useTransition()
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (formData: FormData) => {
    const query = formData.get('search') as string
    startTransition(() => {
      console.log('Searching for:', query)
    })
  }

  return (
    <form action={handleSearch} className="relative group w-full">
      <div className="relative">
        <input
          type="text"
          name="search"
          placeholder="Szukaj w świecie Java..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isPending}
          className={`w-full pl-10 pr-4 py-2 border-2 rounded-lg
                     bg-java-white/90 backdrop-blur-sm transition-all duration-300
                     focus:ring-2 focus:ring-java-orange/50 text-sm outline-none
                     disabled:opacity-50 placeholder:text-java-gray/50
                     ${isFocused 
                       ? 'border-java-orange focus:border-java-orange bg-java-white' 
                       : 'border-java-gray/20 hover:border-java-orange/50'
                     }`}
        />
        <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300
                        ${isFocused ? 'text-java-orange scale-110' : 'text-java-gray/60'}`}>
          <MagnifyingGlassIcon className="w-4 h-4" />
        </div>
        {isPending && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-java-orange border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </form>
  )
})

SearchBar.displayName = 'SearchBar' 