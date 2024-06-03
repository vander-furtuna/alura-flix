import { cva, VariantProps } from 'class-variance-authority'
import { ComponentProps } from 'react'

import { cn } from '../lib/tailwind-merge'

export const tagsVariants = cva(
  'text-white uppercase font-sans flex items-center justify-center px-8 py-2 rounded-lg w-fit',
  {
    variants: {
      category: {
        BACKEND: 'bg-gradient-to-r from-emerald-300 to-emerald-500',
        FRONTEND: 'bg-gradient-to-r from-cyan-300 to-cyan-500',
        MOBILE: 'bg-gradient-to-r from-amber-400 to-amber-500',
      },
      size: {
        normal: 'text-3xl font-bold',
        small: 'text-2xl font-semibold',
      },
    },
    defaultVariants: {
      category: 'FRONTEND',
      size: 'normal',
    },
  },
)

interface TagProps
  extends ComponentProps<'div'>,
    VariantProps<typeof tagsVariants> {}

export function Tag({
  className,
  category = 'FRONTEND',
  size = 'normal',
  children,
  ...props
}: TagProps) {
  function getTagCategory(category: string) {
    switch (category) {
      case 'BACKEND':
        return 'Back-end'
      case 'FRONTEND':
        return 'Front-end'
      case 'MOBILE':
        return 'Mobile'
      default:
        return children
    }
  }

  return (
    <div className={cn(tagsVariants({ className, category, size }))} {...props}>
      {category && getTagCategory(category)}
    </div>
  )
}
