import { memo } from 'react'
import type { NavigationItem as NavigationItemType } from '../types/navigation.types'

interface NavigationItemProps {
  item: NavigationItemType
  isMobile?: boolean
  onClick?: () => void
  animationDelay?: string
}

export const NavigationItem = memo<NavigationItemProps>(({ 
  item, 
  isMobile = false, 
  onClick,
  animationDelay 
}) => {
  const baseClasses = `
    relative font-medium transition-all duration-300 group focus:outline-none
    text-java-gray hover:text-java-orange
  `
  
  const desktopClasses = `
    px-3 py-2 rounded-lg text-sm
  `
  
  const mobileClasses = `
    block px-4 py-4 rounded-xl transform hover:translate-x-2
    border border-transparent hover:border-java-orange/10
  `

  return (
    <a
      href={item.href}
      className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
      onClick={onClick}
      style={animationDelay ? { animationDelay } : undefined}
    >
      {item.name}
      
      <span 
        className={`absolute h-0.5 bg-java-orange transition-all duration-300 
                   ${isMobile 
                     ? 'bottom-2 left-4 w-0 group-hover:w-[calc(100%-2rem)]'
                     : 'bottom-1 left-3 w-0 group-hover:w-[calc(100%-1.5rem)]'
                   }`} 
      />
    </a>
  )
})

NavigationItem.displayName = 'NavigationItem' 