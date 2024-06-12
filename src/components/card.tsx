import { cva, VariantProps } from 'class-variance-authority'
import { ComponentProps } from 'react'

import { useVideos } from '../contexts/video'
import { cn } from '../lib/tailwind-merge'
import { Video } from '../types/videos'
import { ActionButton } from './action-button'
import { EditDialog } from './edit-dialog'

const cardVariants = cva(
  'w-[25rem] h-[14rem] border-2 border-solid rounded-xl shadow-xl overflow-hidden transition-shadow duration-300 ease-in-out cursor-pointer relative',
  {
    variants: {
      category: {
        BACKEND:
          'border-emerald-500  shadow-emerald-500/60 hover:shadow-emerald-500/80',
        FRONTEND: 'border-cyan-500 shadow-cyan-500/60 hover:shadow-cyan-500/80',
        MOBILE:
          'border-amber-400 shadow-amber-400/60 hover:shadow-amber-400/80',
      },
    },
  },
)

interface CardProps
  extends ComponentProps<'div'>,
    VariantProps<typeof cardVariants> {
  video: Video
}

export function Card({ video, className, category }: CardProps) {
  const { deleteVideo } = useVideos()
  return (
    <div className={cn(cardVariants({ className, category }))}>
      <img
        src={video.thumbnailUrl}
        alt={`Capa do vídeo ${video.title}`}
        className="size-full object-cover"
      />
      <div className="absolute bottom-4 right-4 flex gap-2">
        <ActionButton action="delete" onClick={() => deleteVideo(video.id)} />
        <EditDialog video={video}>
          <ActionButton action="edit" />
        </EditDialog>
      </div>
    </div>
  )
}
