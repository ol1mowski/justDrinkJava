import { memo } from 'react'
import { HeroSection } from './components/HeroSection.component'
import { MissionSection } from './components/MissionSection.component'
import { CreatorSection } from './components/CreatorSection.component'
import { CTASection } from './components/CTASection.component'

export const AboutPage = memo(() => {
  return (
    <div className="min-h-screen bg-java-white dark:bg-java-dark-bg">
      <HeroSection />
      <MissionSection />
      <CreatorSection />
      <CTASection />
    </div>
  )
})

AboutPage.displayName = 'AboutPage' 