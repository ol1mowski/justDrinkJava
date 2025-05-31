import { memo } from 'react'
import { NavigationItem } from './NavigationItem.components'
import { useLanguage } from '../../../hooks/useLanguage.hooks'
import { useTranslations } from '../../../translations'

export const DesktopNavigation = memo(() => {
  const { currentLanguage } = useLanguage()
  const t = useTranslations(currentLanguage)

  const navigationItems = [
    { name: t.navigation.posts, href: '/posts' },
    { name: t.navigation.about, href: '/about' },
    { name: t.navigation.quizzes, href: '/quizzes' },
    { name: t.navigation.jobs, href: '/jobs' },
  ]

  return (
    <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center max-w-md">
      {navigationItems.map((item) => (
        <NavigationItem
          key={item.name}
          name={item.name}
          href={item.href}
        />
      ))}
    </nav>
  )
})

DesktopNavigation.displayName = 'DesktopNavigation' 