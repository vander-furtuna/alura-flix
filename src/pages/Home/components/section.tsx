import { ComponentProps } from 'react'

import { Card } from '../../../components/card'
import { Tag } from '../../../components/tag'
import { Category, Video } from '../../../types/videos'

interface SectionProps extends ComponentProps<'section'> {
  category: Category
  videos: Video[]
}

export function Section({ category, videos, ...props }: SectionProps) {
  return (
    <article className="flex h-fit flex-col gap-6" {...props}>
      <Tag category={category} />
      <div className="flex gap-4">
        {videos.map((video) => (
          <Card category={category} video={video} key={video.id} />
        ))}
      </div>
    </article>
  )
}
