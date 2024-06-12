import 'swiper/css'
import 'swiper/css/navigation'

import { Film } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Button } from '../../../components/button'
import { Header } from '../../../components/header'
import { useVideos } from '../../../contexts/video'
import { Category } from '../../../types/videos'
import { BannerSlide } from './banner-slide'

export function Banner() {
  const { videos } = useVideos()

  const [activeCategory, setActiveCategory] = useState<Category | null>(
    videos && videos?.length > 0 ? videos[0].category : null,
  )

  const featuredVideos = useMemo(
    () => videos?.filter((video) => video.isFeatured) || [],
    [videos],
  )

  const handleCategoryChange = useCallback(
    (index: number) => {
      const videoCategory = featuredVideos[index].category
      if (videoCategory !== activeCategory) {
        setActiveCategory(videoCategory)
      }
    },
    [featuredVideos, activeCategory],
  )

  useEffect(() => {
    if (activeCategory === null && videos && videos.length > 0) {
      setActiveCategory(videos[0].category)
    }
    console.log(videos)
  }, [videos, activeCategory])

  return (
    <section className="h-[40rem] w-full bg-neutral-900">
      <Header className="absolute" category={activeCategory}>
        <Button Icon={Film} category={activeCategory} as="a" link="/novo-video">
          Criar
        </Button>
      </Header>
      <Swiper
        navigation={true}
        rewind={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Autoplay]}
        className="size-full"
        onSlideChange={({ activeIndex }) => handleCategoryChange(activeIndex)}
      >
        {featuredVideos.map((video) => (
          <SwiperSlide key={video.id} className="relative">
            <BannerSlide video={video} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
