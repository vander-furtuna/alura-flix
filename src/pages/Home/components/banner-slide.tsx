import { Tag } from '../../../components/tag'
import { Video } from '../../../types/videos'

interface BannerSlideProps {
  video: Video
}

export function BannerSlide({ video }: BannerSlideProps) {
  return (
    <>
      <img
        src={video.thumbnailUrl}
        alt={`Imagem de fundo do vídeo ${video.title}`}
        className="size-full object-cover"
      />
      <div className="absolute bottom-0 size-full">
        <div className="absolute bottom-16 left-16 z-20 flex w-full max-w-[56rem] flex-col items-start gap-2">
          <Tag category={video.category} size="small" />
          <h2 className="text-3xl font-bold text-white">{video.title}</h2>
          <p>{video.description}</p>
        </div>
        <div className="absolute bottom-0 h-[28rem] w-full bg-gradient-to-t from-neutral-900 to-transparent" />
      </div>
    </>
  )
}
