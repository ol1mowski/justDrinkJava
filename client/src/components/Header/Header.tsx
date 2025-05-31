import { Bars3Icon } from '@heroicons/react/24/outline'
import { useScrollDetection } from './hooks/useScrollDetection.hooks'
import { useMobileMenu } from './hooks/useMobileMenu.hooks'
import { navigationItems } from './config/navigation.config'
import { NavigationItem } from './components/NavigationItem.components'
import { SearchBar } from './components/SearchBar.components'
import { LoginButton } from './components/LoginButton.components'
import { MobileMenu } from './components/MobileMenu.components' 

type NavigationItemType = {
  name: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

export const Header = () => {
  const isScrolled = useScrollDetection(10)
  const mobileMenu = useMobileMenu()

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-java-white/90 backdrop-blur-xl border-b border-java-gray/20' 
          : 'bg-java-white/95 backdrop-blur-md border-b border-java-gray/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center group">
                <img 
                  src="/JustDrinkJava_logo.png" 
                  alt="JustDrinkJava" 
                  className="h-10 w-auto transition-all duration-300 
                            group-hover:scale-110"
                />
              </a>
            </div>

            <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center max-w-md">
              {navigationItems.map((item: NavigationItemType) => (
                <NavigationItem
                  key={item.name}
                  item={item}
                />
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
              <div className="w-80">
                <SearchBar />
              </div>
              <LoginButton />
            </div>

            <button
              onClick={mobileMenu.toggle}
              className="lg:hidden relative p-3 rounded-xl
                        bg-java-light-gray/50 hover:bg-java-orange/10
                        transition-all duration-300 transform hover:scale-105
                        border border-java-gray/10 hover:border-java-orange/20
                        focus:outline-none"
            >
              <div className={`transition-transform duration-300 ${
                mobileMenu.isOpen ? 'rotate-90' : ''
              }`}>
                <Bars3Icon className="w-6 h-6 text-java-gray" />
              </div>
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-px 
                       bg-gradient-to-r from-transparent via-java-orange/30 to-transparent" />
      </header>

      <MobileMenu 
        isOpen={mobileMenu.isOpen} 
        onClose={mobileMenu.close} 
      />
    </>
  )
}

export default Header 