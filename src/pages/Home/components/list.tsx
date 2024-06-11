import { useMemo } from 'react'

import { useVideos } from '../../../contexts/video'
import { Section } from './section'

export function List() {
  const { videos } = useVideos()

  const frontEndVideos = useMemo(
    () => videos?.filter((video) => video.category === 'FRONTEND') || [],
    [videos],
  )
  const backEndVideos = useMemo(
    () => videos?.filter((video) => video.category === 'BACKEND') || [],
    [videos],
  )
  const mobileVideos = useMemo(
    () => videos?.filter((video) => video.category === 'MOBILE') || [],
    [videos],
  )

  return (
    <section className="flex w-full flex-col gap-16 p-16">
      <Section category="FRONTEND" videos={frontEndVideos} />
      <Section category="BACKEND" videos={backEndVideos} />
      <Section category="MOBILE" videos={mobileVideos} />
    </section>
  )
}
