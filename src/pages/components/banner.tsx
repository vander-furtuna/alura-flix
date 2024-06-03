import 'swiper/css'
import 'swiper/css/navigation'

import { Film } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import vanderFlixLogo from '../../assets/vander-flix-logo.png'
import { Button } from '../../components/button'
import { useVideos } from '../../contexts/video'
import { Category } from '../../types/videos'
import { BannerSlide } from './banner-slide'

export function Banner() {
  const { videos } = useVideos()

  const [activeCategory, setActiveCategory] = useState<Category>(
    videos && videos?.length > 0 ? videos[0].category : 'NONE',
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
    if (activeCategory === 'NONE' && videos && videos.length > 0) {
      setActiveCategory(videos[0].category)
    }
    console.log(videos)
  }, [videos, activeCategory])

  return (
    <section className="h-[40rem] w-full bg-neutral-900">
      <div
        className="absolute z-10 flex h-32 w-full justify-between bg-gradient-to-b to-transparent px-16 py-12 data-[category=BACKEND]:from-emerald-400/70 data-[category=FRONTEND]:from-cyan-400/70 data-[category=MOBILE]:from-amber-500/70"
        data-category={activeCategory}
      >
        <img
          src={vanderFlixLogo}
          alt="Logo vander.flix"
          className="h-8 w-auto"
        />

        <Button Icon={Film} category={activeCategory}>
          Criar
        </Button>
      </div>
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
