import { zodResolver } from '@hookform/resolvers/zod'
import { Captions, Film, Home, Image } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { v4 } from 'uuid'
import { z } from 'zod'

import { Button } from '../components/button'
import { Checkbox } from '../components/checkbox'
import { TextInput } from '../components/forms/text-input'
import { Textarea } from '../components/forms/textarea'
import { Header } from '../components/header'
import { Select } from '../components/select'
import { useVideos } from '../contexts/video'
import { Category } from '../types/videos'
import { getThumbnail } from '../utils/getYoutubeThumbnail'

export const OPTIONS = [
  {
    label: 'Front-end',
    value: 'FRONTEND',
  },
  {
    label: 'Back-end',
    value: 'BACKEND',
  },
  {
    label: 'Mobile',
    value: 'MOBILE',
  },
]

const newVideoSchema = z.object({
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

type NewVideoType = z.infer<typeof newVideoSchema>

export function NewVideo() {
  const [activeCategory, setActiveCategory] = useState<Category>('FRONTEND')

  const { addVideo } = useVideos()

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm<NewVideoType>({
    resolver: zodResolver(newVideoSchema),
    reValidateMode: 'onBlur',
  })

  const handleCreateVideo = useCallback(
    (data: NewVideoType) => {
      try {
        const newVideo = {
          ...data,
          id: v4(),
        }
        addVideo(newVideo)
        toast.success('Vídeo criado com sucesso!')
        reset()
      } catch (error) {
        console.error(error)
        toast.error('Não foi possivel criar vídeo')
      }
    },
    [addVideo, reset],
  )

  const category = watch('category')
  const video = watch('url')
  useEffect(() => {
    setActiveCategory(category || 'FRONTEND')
  }, [category])

  useEffect(() => {
    if (z.string().url().safeParse(video).success) {
      const thumbnailUrl = getThumbnail(video)
      setValue('thumbnailUrl', thumbnailUrl)
    }
  }, [video, setValue])

  return (
    <main className="flex size-full flex-col items-center">
      <Header category={activeCategory}>
        <Button
          variant="outlined"
          link="/"
          Icon={Home}
          category={activeCategory}
        >
          Home
        </Button>
      </Header>
      <section className="flex w-full flex-col items-center gap-16 px-12 py-16">
        <h1 className="text-5xl font-bold uppercase">Novo Vídeo</h1>
        <form
          onSubmit={handleSubmit(handleCreateVideo)}
          className="flex w-full max-w-5xl flex-col gap-4"
        >
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <div className="flex w-full flex-col gap-4">
              <fieldset className="flex w-full flex-col gap-4 md:flex-row">
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
              </fieldset>
              <fieldset className="flex w-full flex-col gap-4 md:flex-row">
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
              </fieldset>
            </div>
            <fieldset className="flex w-full">
              <Textarea
                label="Descrição"
                Icon={Captions}
                category={activeCategory}
                error={errors.description?.message}
                {...register('description')}
              />
            </fieldset>
          </div>
          <Checkbox
            label="Destaque"
            category={activeCategory}
            {...register('isFeatured')}
          />
          <div className="flex w-full justify-end gap-4">
            <Button
              category={activeCategory}
              variant="outlined"
              type="button"
              onClick={() => reset()}
            >
              Limpar
            </Button>
            <Button
              className="self-end"
              type="submit"
              category={activeCategory}
            >
              Criar Vídeo
            </Button>
          </div>
        </form>
      </section>
    </main>
  )
}
