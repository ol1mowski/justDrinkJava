import { memo } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { SearchBar } from './SearchBar.components'
import { LoginButton } from './LoginButton.components'
import { NavigationItem } from './NavigationItem.components'
import { navigationItems } from '../config/navigation.config'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileMenu = memo<MobileMenuProps>(({ isOpen, onClose }) => {
  return (
    <div 
      className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      <div 
        className={`fixed top-0 right-0 h-full w-80 
                   bg-java-white/95 backdrop-blur-xl border-l border-java-gray/10
                   transform transition-all duration-500 ${
                     isOpen ? 'translate-x-0' : 'translate-x-full'
                   }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-java-gray/10">
          <img 
            src="/JustDrinkJava_logo.png" 
            alt="JustDrinkJava" 
            className="h-8 w-auto transform hover:scale-105 transition-transform duration-200"
          />
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-java-light-gray/50 
                      transition-all duration-200 hover:rotate-90 group focus:outline-none"
          >
            <XMarkIcon className="w-6 h-6 text-java-gray group-hover:text-java-orange transition-colors" />
          </button>
        </div>
        
        <nav className="p-6 space-y-2">
          <div className="space-y-2 mb-8">
            {navigationItems.map((item, index) => (
              <NavigationItem
                key={item.name}
                item={item}
                isMobile
                onClick={onClose}
                animationDelay={`${index * 0.1}s`}
              />
            ))}
          </div>
          
          <div className="pb-4 border-b border-java-gray/10">
            <LoginButton />
          </div>
          
          <div className="pt-4">
            <SearchBar />
          </div>
        </nav>
      </div>
    </div>
  )
})

MobileMenu.displayName = 'MobileMenu' 