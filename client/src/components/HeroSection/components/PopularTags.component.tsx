import { memo } from 'react'
import { useHashtags } from '../hooks/useHashtags.hook'
import { ErrorBoundaryWrapper } from '../../ui'
import { HashtagsLoadingState } from './HashtagsLoadingState.component'
import { HashtagsErrorState } from './HashtagsErrorState.component'
import { PopularTagsHeader } from './PopularTagsHeader.component'
import { TagsList } from './TagsList.component'
import { PopularTagsFooter } from './PopularTagsFooter.component'

export const PopularTags = memo(() => {
  const { tags, loading, error, refetch } = useHashtags(10)

  if (loading) {
    return <HashtagsLoadingState itemsCount={10} />
  }

  if (error) {
    return <HashtagsErrorState error={error} onRetry={refetch} />
  }

  return (
    <ErrorBoundaryWrapper
      title="Błąd komponentu hashtagów"
      message="Wystąpił problem podczas wyświetlania popularnych tematów"
    >
      <div className="bg-java-white dark:bg-java-dark-surface rounded-2xl p-6 sm:p-8 
                     border border-java-gray/10 dark:border-java-dark-text/10">
        <PopularTagsHeader />
        <TagsList tags={tags} />
        <PopularTagsFooter />
      </div>
    </ErrorBoundaryWrapper>
  )
})

PopularTags.displayName = 'PopularTags' 