import { useState, useTransition, memo, useEffect } from 'react'
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'

type NavigationItem = {
    name: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
}

const navigationItems: NavigationItem[] = [
    { name: 'Posty', href: '/posts' },
    { name: 'O nas', href: '/about' },
    { name: 'Quizy', href: '/quizzes' },
    { name: 'Oferty pracy', href: '/jobs' },
]

const SearchBar = memo(() => {
    const [isPending, startTransition] = useTransition()
    const [searchQuery, setSearchQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)

    const handleSearch = (formData: FormData) => {
        const query = formData.get('search') as string
        startTransition(() => {
            console.log('Searching for:', query)
        })
    }

    return (
        <form action={handleSearch} className="relative group w-full">
            <div className="relative">
                <input
                    type="text"
                    name="search"
                    placeholder="Szukaj w świecie Java..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={isPending}
                    className={`w-full pl-10 pr-4 py-2 border-2 rounded-lg
                     bg-java-white/90 backdrop-blur-sm transition-all duration-300
                     focus:ring-2 focus:ring-java-orange/50 text-sm outline-none
                     disabled:opacity-50 placeholder:text-java-gray/50
                     ${isFocused
                            ? 'border-java-orange focus:border-java-orange bg-java-white'
                            : 'border-java-gray/20 hover:border-java-orange/50'
                        }`}
                />
                <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300
                        ${isFocused ? 'text-java-orange scale-110' : 'text-java-gray/60'}`}>
                    <MagnifyingGlassIcon className="w-4 h-4" />
                </div>
                {isPending && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-java-orange border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
            </div>
        </form>
    )
})

SearchBar.displayName = 'SearchBar'

const LoginButton = memo(() => {
    return (
        <a
            href="/login"
            className="relative group focus:outline-none"
        >
            <div className="flex items-center space-x-2 px-4 py-2 rounded-lg
                     bg-java-orange text-java-white font-medium text-sm
                     transition-all duration-300 transform
                     hover:scale-105 hover:bg-java-orange/90
                     whitespace-nowrap focus:outline-none">
                <UserIcon className="w-4 h-4" />
                <span>Zaloguj</span>
            </div>
        </a>
    )
})

LoginButton.displayName = 'LoginButton'

const MobileMenu = memo(({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <div
            className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${isOpen
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible'
                }`}
        >
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={onClose}
            />

            <div
                className={`fixed top-0 right-0 h-full w-80 
                   bg-java-white/95 backdrop-blur-xl border-l border-java-gray/10
                   transform transition-all duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'
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
                            <a
                                key={item.name}
                                href={item.href}
                                className="relative block px-4 py-4 text-java-gray hover:text-java-orange 
                          rounded-xl transition-all duration-300 font-medium
                          transform hover:translate-x-2 group focus:outline-none
                          border border-transparent hover:border-java-orange/10"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={onClose}
                            >
                                {item.name}
                                <span className="absolute bottom-2 left-4 w-0 h-0.5 bg-java-orange 
                               transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
                            </a>
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

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <>
            <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled
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
                            {navigationItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="relative px-3 py-2 text-java-gray hover:text-java-orange 
                            font-medium transition-all duration-300 group rounded-lg
                            text-sm focus:outline-none"
                                >
                                    {item.name}

                                    <span className="absolute bottom-1 left-3 w-0 h-0.5 bg-java-orange 
                                 transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]" />
                                </a>
                            ))}
                        </nav>

                        <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
                            <div className="w-80">
                                <SearchBar />
                            </div>
                            <LoginButton />
                        </div>

                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden relative p-3 rounded-xl
                        bg-java-light-gray/50 hover:bg-java-orange/10
                        transition-all duration-300 transform hover:scale-105
                        border border-java-gray/10 hover:border-java-orange/20
                        focus:outline-none"
                        >
                            <div className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}>
                                <Bars3Icon className="w-6 h-6 text-java-gray" />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px 
                       bg-gradient-to-r from-transparent via-java-orange/30 to-transparent" />
            </header>

            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </>
    )
}

export default Header 