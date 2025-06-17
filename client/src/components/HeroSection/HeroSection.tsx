import { memo } from 'react'
import { ErrorBoundaryWrapper } from '../ui'
import { LatestPost } from './components/LatestPost.component'
import { CallToAction } from './components/CallToAction.components'
import { StatisticsGrid } from './components/StatisticsGrid.components'
import { PopularTags } from './components/PopularTags.component'
import { QuizBanner } from './components/QuizBanner.component'

export const HeroSection = memo(() => {
  return (
    <ErrorBoundaryWrapper
      title="Błąd sekcji głównej"
      message="Wystąpił problem podczas ładowania sekcji głównej strony"
    >
      <section className="relative py-12 lg:py-20 bg-java-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-8">
              <div className="space-y-8">
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold 
                                leading-tight break-words">
                    <span className="text-java-blue">just</span>
                    <span className="text-java-red">Drink</span>
                    <span className="text-java-orange">Java</span>
                  </h1>
                  <p className="mt-4 text-lg sm:text-xl text-java-blue/90 max-w-3xl">
                    Odkryj świat programowania w Javie. Najnowsze artykuły, tutoriale i najlepsze praktyki 
                    dla developerów na każdym poziomie zaawansowania.
                  </p>
                </div>
                
                <ErrorBoundaryWrapper
                  title="Błąd sekcji akcji"
                  message="Wystąpił problem z przyciskiem Call-to-Action"
                >
                  <CallToAction />
                </ErrorBoundaryWrapper>
                
                <ErrorBoundaryWrapper
                  title="Błąd najnowszego posta"
                  message="Wystąpił problem podczas ładowania najnowszego posta"
                >
                  <LatestPost />
                </ErrorBoundaryWrapper>
                
                <ErrorBoundaryWrapper
                  title="Błąd banera quizów"
                  message="Wystąpił problem podczas ładowania banera z quizami"
                >
                  <QuizBanner />
                </ErrorBoundaryWrapper>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="space-y-8">
                <ErrorBoundaryWrapper
                  title="Błąd statystyk"
                  message="Wystąpił problem podczas ładowania statystyk"
                >
                  <StatisticsGrid />
                </ErrorBoundaryWrapper>
                
                <PopularTags />
              </div>
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundaryWrapper>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection 