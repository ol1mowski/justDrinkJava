import { memo } from 'react'
import { HeroSection } from './components/HeroSection.component'
import { JobBoardsRanking } from './components/JobBoardsRanking.component'
import { CTASection } from './components/CTASection.component'

export const JobsPage = memo(() => {
  return (
    <div className="min-h-screen bg-java-white dark:bg-java-dark-bg">
      <HeroSection />
      <JobBoardsRanking />
      <CTASection />
    </div>
  )
})

JobsPage.displayName = 'JobsPage' 