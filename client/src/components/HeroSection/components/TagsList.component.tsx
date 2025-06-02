import { memo } from 'react'
import type { Tag } from '../hooks/useHashtags.hook'
import { TagItem } from './TagItem.component'

interface TagsListProps {
  tags: Tag[]
}

export const TagsList = memo<TagsListProps>(({ tags }) => {
  return (
    <div className="space-y-4">
      {tags.map((tag, index) => (
        <TagItem key={tag.id} tag={tag} index={index} />
      ))}
    </div>
  )
})

TagsList.displayName = 'TagsList' 