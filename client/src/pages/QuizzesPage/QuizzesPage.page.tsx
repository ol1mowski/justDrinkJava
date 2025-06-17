import { memo } from 'react'
import { QuizzesPage as QuizzesPageComponent } from '../../components/QuizzesPage/QuizzesPage.component'

export const QuizzesPage = memo(() => {
  return <QuizzesPageComponent />
})

QuizzesPage.displayName = 'QuizzesPage'
