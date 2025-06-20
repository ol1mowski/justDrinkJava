import { memo } from 'react'
import { HeroSection } from './components/HeroSection.component'
import { JobBoardsRanking } from './components/JobBoardsRanking.component'
import { JavaCareerTips } from './components/JavaCareerTips.component'
import { CTASection } from './components/CTASection.component'
import { ErrorBoundaryWrapper } from '../ui'

export const JobsPage = memo(() => {
  return (
    <ErrorBoundaryWrapper
      title="Błąd strony pracy"
      message="Wystąpił problem podczas ładowania strony z ofertami pracy"
    >
      <div className="min-h-screen bg-java-white dark:bg-java-dark-bg">
        <HeroSection />
        <JobBoardsRanking />
        <JavaCareerTips />
        <CTASection />
      </div>
    </ErrorBoundaryWrapper>
  )
})

JobsPage.displayName = 'JobsPage' 