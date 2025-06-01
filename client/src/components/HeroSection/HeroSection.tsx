import { memo } from 'react'
import { LatestPost } from './components/LatestPost.components'
import { CallToAction } from './components/CallToAction.components'
import { StatisticsGrid } from './components/StatisticsGrid.components'
import { PopularTags } from './components/PopularTags.components'

export const HeroSection = memo(() => {
  return (
    <section className="relative py-12 lg:py-20 bg-java-white dark:bg-java-dark-bg">
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
                <p className="mt-4 text-lg sm:text-xl text-java-blue/90 dark:text-java-dark-text-secondary max-w-3xl">
                  Odkryj świat programowania w Javie. Najnowsze artykuły, tutoriale i najlepsze praktyki 
                  dla developerów na każdym poziomie zaawansowania.
                </p>
              </div>
              <CallToAction />
              <LatestPost />
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="space-y-8">
              <StatisticsGrid />
              <PopularTags />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection 