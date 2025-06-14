import { useState, useCallback } from 'react'

type TabType = 'login' | 'register' | 'reset'

export const useTabSwitcher = (initialTab: TabType = 'login') => {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab)

  const switchTab = useCallback((tab: TabType) => {
    setActiveTab(tab)
  }, [])

  const isActive = useCallback((tab: TabType) => {
    return activeTab === tab
  }, [activeTab])

  return {
    activeTab,
    switchTab,
    isActive
  }
} 