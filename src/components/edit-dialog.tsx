import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { Captions, Film, Image, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useVideos } from '../contexts/video'
import { OPTIONS } from '../pages/NewVideo'
import { Category, Video } from '../types/videos'
import { getThumbnail } from '../utils/getYoutubeThumbnail'
import { Button } from './button'
import { Checkbox } from './checkbox'
import { TextInput } from './forms/text-input'
import { Textarea } from './forms/textarea'
import { Select } from './select'

interface DialogProps extends Dialog.DialogProps {
  video: Video
}

const editVideoSchema = z.object({
  title: z
    .string({
      required_error: 'O título é obrigatório',
    })
    .min(3, 'O título deve ter no mínimo 3 caracteres'),
  description: z
    .string({
      required_error: 'A descrição é obrigatória',
    })
    .min(3, 'A descrição deve ter no mínimo 3 caracteres'),
  thumbnailUrl: z
    .string({
      required_error: 'A imagem é obrigatória',
    })
    .url({
      message: 'A imagem deve ser um URL',
    }),
  url: z
    .string({
      required_error: 'O vídeo é obrigatório',
    })
    .url({
      message: 'O vídeo deve ser um URL',
    }),
  category: z.union([
    z.literal('FRONTEND'),
    z.literal('BACKEND'),
    z.literal('MOBILE'),
  ]),
  isFeatured: z.boolean().default(false),
})

type editVideoType = z.infer<typeof editVideoSchema>

export function EditDialog({ children, video }: DialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>('FRONTEND')

  const { editVideo } = useVideos()

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm<editVideoType>({
    resolver: zodResolver(editVideoSchema),
    reValidateMode: 'onBlur',
    values: { ...video, category: video.category || 'FRONTEND' },
  })

  const handleEditVideo = async (data: editVideoType) => {
    try {
      editVideo({
        ...data,
        id: video.id,
      })
      setIsDialogOpen(false)
      toast.success('Vídeo editado com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Não foi possivel editar vídeo')
    }
  }

  const category = watch('category')
  const url = watch('url')

  useEffect(() => {
    setActiveCategory(category || 'FRONTEND')
  }, [category])

  useEffect(() => {
    if (z.string().url().safeParse(url).success) {
      const thumbnailUrl = getThumbnail(url)
      setValue('thumbnailUrl', thumbnailUrl)
    }
  }, [url, setValue])

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-30 bg-black/60 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-40 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-neutral-900 p-[25px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Editar Vídeo
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-white/85">
            Faça mudanças no vídeo abaixo e clique em &quot;Editar Vídeo&quot;
            para salvar.
          </Dialog.Description>
          <form
            onSubmit={handleSubmit(handleEditVideo)}
            className="flex w-full max-w-5xl flex-col gap-4"
          >
            <TextInput
              category={activeCategory}
              Icon={Captions}
              label="Título"
              error={errors.title?.message}
              {...register('title')}
            />
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  category={activeCategory}
                  options={OPTIONS}
                  onValueChange={onChange}
                  value={value}
                  error={errors.category?.message}
                />
              )}
            />

            <TextInput
              category={activeCategory}
              Icon={Image}
              label="URL da Imagem"
              error={errors.thumbnailUrl?.message}
              {...register('thumbnailUrl')}
            />
            <TextInput
              category={activeCategory}
              Icon={Film}
              label="URL do Video"
              error={errors.url?.message}
              {...register('url')}
            />

            <Textarea
              label="Descrição"
              Icon={Captions}
              category={activeCategory}
              error={errors.description?.message}
              {...register('description')}
            />

            <Checkbox
              label="Destaque"
              category={activeCategory}
              {...register('isFeatured')}
            />
            <div className="flex w-full justify-end gap-4">
              <Button
                type="button"
                variant="outlined"
                category={activeCategory}
                onClick={() => reset()}
              >
                Limpar
              </Button>
              <Button
                className="self-end"
                type="submit"
                category={activeCategory}
              >
                Editar Vídeo
              </Button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
