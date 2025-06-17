import { memo } from 'react'
import { HeroSection } from './components/HeroSection.component'
import { MissionSection } from './components/MissionSection.component'
import { CreatorSection } from './components/CreatorSection.component'
import { CTASection } from './components/CTASection.component'
import { ErrorBoundaryWrapper } from '../ui'

export const AboutPage = memo(() => {
  return (
    <ErrorBoundaryWrapper
      title="Błąd strony O nas"
      message="Wystąpił problem podczas ładowania strony O nas"
    >
      <div className="min-h-screen bg-java-white dark:bg-java-dark-bg">
        <HeroSection />
        <MissionSection />
        <CreatorSection />
        <CTASection />
      </div>
    </ErrorBoundaryWrapper>
  )
})

AboutPage.displayName = 'AboutPage' 