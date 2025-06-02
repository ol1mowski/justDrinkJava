import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavigationItemProps {
  name?: string
  href?: string
  item?: {
    name: string
    href: string
  }
  isMobile?: boolean
  onClick?: () => void
  animationDelay?: string
}

export const NavigationItem = memo<NavigationItemProps>(({ 
  name, 
  href, 
  item, 
  isMobile, 
  onClick, 
  animationDelay 
}) => {
  const location = useLocation()
  const itemName = name || item?.name || ''
  const itemHref = href || item?.href || ''
  
  const isActive = location.pathname === itemHref
  
  const baseClasses = isMobile
    ? `block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
        isActive 
          ? 'text-java-orange bg-java-orange/10' 
          : 'text-java-gray hover:text-java-orange hover:bg-java-orange/5'
      }`
    : `relative px-3 py-2 font-medium transition-all duration-300 group rounded-lg text-sm focus:outline-none ${
        isActive 
          ? 'text-java-orange' 
          : 'text-java-gray dark:text-java-dark-text hover:text-java-orange'
      }`

  return (
    <Link
      to={itemHref}
      onClick={onClick}
      className={baseClasses}
      style={animationDelay ? { animationDelay } : undefined}
    >
      {itemName}
      {!isMobile && (
        <span className={`absolute bottom-1 left-3 h-0.5 bg-java-orange transition-all duration-300 ${
          isActive ? 'w-[calc(100%-1.5rem)]' : 'w-0 group-hover:w-[calc(100%-1.5rem)]'
        }`} />
      )}
    </Link>
  )
})

NavigationItem.displayName = 'NavigationItem' 