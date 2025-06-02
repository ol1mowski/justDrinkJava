import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../../../utils/api'
import { useErrorHandler } from '../../../hooks/useErrorHandler.hook'

export interface HashtagDto {
  id: number
  name: string
}

export interface Tag {
  id: string
  name: string
  count: number
  color: 'orange' | 'red' | 'blue'
  trending?: boolean
}

const hashtagToTag = (hashtag: HashtagDto, index: number): Tag => {
  const colors: Tag['color'][] = ['orange', 'red', 'blue']
  const randomColor = colors[index % colors.length]
  const randomCount = Math.floor(Math.random() * 150) + 20 
  const trending = Math.random() > 0.7 
  
  return {
    id: hashtag.id.toString(),
    name: hashtag.name,
    count: randomCount,
    color: randomColor,
    trending
  }
}

export const useHashtags = (limit: number = 10) => {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const { error, handleError, clearError } = useErrorHandler()

  const fetchHashtags = async () => {
    try {
      setLoading(true)
      clearError()
      
      const response = await fetch(`${API_BASE_URL}/hashtags`)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const hashtags: HashtagDto[] = await response.json()
      
      const convertedTags = hashtags
        .slice(0, limit)
        .map((hashtag, index) => hashtagToTag(hashtag, index))
      
      setTags(convertedTags)
      
    } catch (err) {
      handleError(err, 'FETCH_HASHTAGS_ERROR')
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchHashtags()
  }

  useEffect(() => {
    fetchHashtags()
  }, [limit])

  return { 
    tags, 
    loading, 
    error: error?.message || null, 
    hasError: !!error,
    refetch,
    clearError
  }
} 