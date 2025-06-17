import { memo } from 'react'
import { AboutPage as AboutPageComponent } from '../../components/AboutPage/AboutPage.component'

export const AboutPage = memo(() => {
  return <AboutPageComponent />
})

AboutPage.displayName = 'AboutPage' 