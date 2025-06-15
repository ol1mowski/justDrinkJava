import { memo, useState, useRef, useEffect } from 'react'
import { 
  UserIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline'
import { useAuth } from '../../../hooks/useAuth.hook'

export const UserMenu = memo(() => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Zamknij menu po kliknięciu poza nim
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  const handleSettings = () => {
    console.log('Navigate to settings')
    setIsOpen(false)
  }

  if (!user) return null

  return (
    <div className="relative" ref={menuRef}>
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex cu items-center space-x-2 px-3 py-2 rounded-lg
                   transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-java-orange"
      >
        <div className="w-8 h-8 bg-java-orange rounded-full flex items-center justify-center">
          <UserIcon className="w-4 h-4 text-white" />
        </div>
                 <span className="text-sm font-medium text-java-gray max-w-24 break-words">
           {user.username}
         </span>
        <ChevronDownIcon 
          className={[
            'w-4 h-4 text-gray-500 transition-transform duration-200',
            isOpen ? 'rotate-180' : ''
          ].join(' ')} 
        />
      </button>

             {/* Dropdown Menu */}
       {isOpen && (
         <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-java-gray">
              {user.username}
            </p>
            <p className="text-xs text-java-gray truncate">
              {user.email}
            </p>
          </div>

          {/* Menu Items */}
          <button
            onClick={handleSettings}
            className="w-full flex items-center px-4 py-2 text-sm text-java-gray hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <Cog6ToothIcon className="w-4 h-4 mr-3" />
            Ustawienia
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
            Wyloguj się
          </button>
        </div>
      )}
    </div>
  )
})

UserMenu.displayName = 'UserMenu' 