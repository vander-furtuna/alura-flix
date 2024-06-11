import { zodResolver } from '@hookform/resolvers/zod'
import { Captions, Film, Image } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Checkbox } from '../components/checkbox'
import { TextInput } from '../components/forms/text-input'
import { Textarea } from '../components/forms/textarea'
import { Select } from '../components/select'

const OPTIONS = [
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
  image: z
    .string({
      required_error: 'A imagem é obrigatória',
    })
    .url({
      message: 'A imagem deve ser um URL',
    }),
  video: z
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
  isPublished: z.boolean(),
})

type NewVideoType = z.infer<typeof newVideoSchema>

export function NewVideo() {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<NewVideoType>({
    resolver: zodResolver(newVideoSchema),
    reValidateMode: 'onBlur',
  })

  const handleCreateVideo = (data: NewVideoType) => {
    console.log(data)
  }

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <main className="flex size-full flex-col items-center py-16">
      <h1 className="text-5xl font-bold uppercase">Novo Vídeo</h1>
      <form
        onSubmit={handleSubmit(handleCreateVideo)}
        className="flex w-full max-w-5xl flex-col gap-4"
      >
        <div className="flex w-full gap-4">
          <div className="flex w-full flex-col gap-4">
            <fieldset className="flex w-full gap-4">
              <TextInput
                category="FRONTEND"
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
                    category="BACKEND"
                    options={OPTIONS}
                    onValueChange={onChange}
                    value={value}
                    error={errors.category?.message}
                  />
                )}
              />
            </fieldset>
            <fieldset className="flex w-full gap-4">
              <TextInput
                category="FRONTEND"
                Icon={Image}
                label="Imagem"
                error={errors.image?.message}
                {...register('image')}
              />
              <TextInput
                category="FRONTEND"
                Icon={Film}
                label="Video"
                error={errors.video?.message}
                {...register('video')}
              />
            </fieldset>
          </div>
          <fieldset className="flex w-full">
            <Textarea
              label="Descrição"
              Icon={Captions}
              category="FRONTEND"
              error={errors.description?.message}
              {...register('description')}
            />
          </fieldset>
        </div>
        <Checkbox
          label="Destaque"
          category="FRONTEND"
          {...register('isPublished')}
        />
        <button>Enviar</button>
      </form>
    </main>
  )
}
