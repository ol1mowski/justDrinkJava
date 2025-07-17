import { memo, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SearchBar } from './SearchBar.components';
import { LoginButton } from './LoginButton.components';
import { UserMenu } from './UserMenu.component';
import { NavigationItem } from './NavigationItem.components';
import { navigationItems } from '../config/navigation.config';
import { useAuth } from '../../../hooks/auth/useAuth.hook';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = memo<MobileMenuProps>(({ isOpen, onClose }) => {
  const { isAuthenticated } = useAuth();

  // Blokuj przewijanie body gdy menu jest otwarte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 lg:hidden transition-all duration-500 overflow-hidden ${
        isOpen
          ? 'opacity-100 visible'
          : 'opacity-0 invisible pointer-events-none'
      }`}
      style={{
        display: isOpen ? 'block' : 'none',
        zIndex: 9999,
      }}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        style={{ zIndex: 9998 }}
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 
                   bg-java-white/95 dark:bg-java-dark-bg/95 border-l border-java-orange/10
                   backdrop-blur-xl shadow-2xl transform transition-all duration-500 ${
                     isOpen ? 'translate-x-0' : 'translate-x-full'
                   }`}
        style={{ zIndex: 10000 }}
      >
        <div className="flex items-center justify-between p-6 border-b border-java-orange/10 dark:border-java-dark-text/20">
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-java-orange/10 cursor-pointer
                      transition-all duration-200 hover:rotate-90 group focus:outline-none"
            style={{ zIndex: 10001 }}
          >
            <XMarkIcon className="w-6 h-6 text-java-gray dark:text-java-dark-text group-hover:text-java-orange transition-colors" />
          </button>
        </div>

        <nav
          className="p-6 space-y-2 overflow-y-auto"
          style={{ height: 'calc(100vh - 80px)' }}
        >
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

          <div className="pb-4 border-b border-java-gray/10 dark:border-java-dark-text/20">
            {isAuthenticated ? <UserMenu /> : <LoginButton />}
          </div>

          <div className="pt-4">
            <SearchBar />
          </div>
        </nav>
      </div>
    </div>
  );
});

MobileMenu.displayName = 'MobileMenu';
