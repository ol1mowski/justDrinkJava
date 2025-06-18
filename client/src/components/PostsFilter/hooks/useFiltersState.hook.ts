import { useState, useCallback } from 'react'
import type { FilterOptions, SortOption } from '../types'

export const useFiltersState = () => {
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [filters, setFiltersState] = useState<FilterOptions>({
    hashtags: [],
    searchQuery: ''
  })

  const setFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }))
  }, [])

  return {
    sortBy,
    setSortBy,
    filters,
    setFilters
  }
} 