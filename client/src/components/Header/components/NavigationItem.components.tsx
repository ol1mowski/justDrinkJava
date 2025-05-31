import { memo } from 'react'

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
  const itemName = name || item?.name || ''
  const itemHref = href || item?.href || ''
  
  const baseClasses = isMobile
    ? "block w-full text-left px-4 py-3 rounded-xl text-java-gray hover:text-java-orange hover:bg-java-orange/5 transition-all duration-300 font-medium"
    : "relative px-3 py-2 text-java-gray dark:text-java-dark-text hover:text-java-orange font-medium transition-all duration-300 group rounded-lg text-sm focus:outline-none"

  return (
    <a
      href={itemHref}
      onClick={onClick}
      className={baseClasses}
      style={animationDelay ? { animationDelay } : undefined}
    >
      {itemName}
      {!isMobile && (
        <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-java-orange 
                       transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]" />
      )}
    </a>
  )
})

NavigationItem.displayName = 'NavigationItem' 