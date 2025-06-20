import { useState } from 'react'
import type { SortOption, FilterOptions } from '../types'

const initialFilters: FilterOptions = {
  searchQuery: '',
  category: undefined
}

export const useFiltersState = () => {
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [filters, setFilters] = useState<FilterOptions>(initialFilters)

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return {
    sortBy,
    setSortBy,
    filters,
    setFilters: updateFilters
  }
} 