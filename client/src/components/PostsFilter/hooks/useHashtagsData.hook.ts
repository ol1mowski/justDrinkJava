import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../../lib/queryKeys'
import { API_BASE_URL } from '../../../utils/api'
import type { HashtagDto } from '../types'

export const useHashtagsData = () => {
  return useQuery({
    queryKey: queryKeys.hashtags.list(),
    queryFn: async (): Promise<HashtagDto[]> => {
      const response = await fetch(`${API_BASE_URL}/hashtags`)
      if (!response.ok) {
        throw new Error(`Failed to fetch hashtags: ${response.status}`)
      }
      return response.json()
    },
  })
} 