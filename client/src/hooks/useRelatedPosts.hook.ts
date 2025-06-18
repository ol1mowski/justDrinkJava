import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../utils/api'
import type { PostData } from '../utils/api'

export interface UseRelatedPostsResult {
  posts: PostData[]
  isLoading: boolean
  hasErrors: boolean
}

export const useRelatedPosts = (mainPostId: number): UseRelatedPostsResult => {
  const [posts, setPosts] = useState<PostData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!mainPostId) return

      setIsLoading(true)
      setHasErrors(false)
      
      try {
        // Pobierz wszystkie posty
        const response = await fetch(`${API_BASE_URL}/posts?limit=50`)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const allPosts: PostData[] = await response.json()
        
        // Filtruj posty: usuń główny post i weź maksymalnie 2 najnowsze
        const relatedPosts = allPosts
          .filter((post: PostData) => post.id !== mainPostId)
          .slice(0, 2)
        
        setPosts(relatedPosts)
      } catch (error) {
        console.error('Błąd podczas pobierania powiązanych postów:', error)
        setHasErrors(true)
        setPosts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRelatedPosts()
  }, [mainPostId])

  return {
    posts,
    isLoading,
    hasErrors
  }
} 