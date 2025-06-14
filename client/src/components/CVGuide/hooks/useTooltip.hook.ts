import { useState, useCallback } from 'react'
import type { TooltipSection } from '../types'

export const useTooltip = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  const handleSectionClick = useCallback((sectionId: string) => {
    setActiveTooltip(sectionId)
  }, [])

  const closeTooltip = useCallback(() => {
    setActiveTooltip(null)
  }, [])

  return {
    activeTooltip,
    handleSectionClick,
    closeTooltip
  }
} 