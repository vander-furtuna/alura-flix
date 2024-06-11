import { cva, VariantProps } from 'class-variance-authority'
import { LucideIcon } from 'lucide-react'
import { ComponentProps } from 'react'

import { cn } from '../lib/tailwind-merge'

const buttonVariants = cva(
  'inline-flex items-center justify-center px-4 py-3 gap-2 text-white rounded-lg uppercase font-bold text-base flex-shrink-0 h-fit',
  {
    variants: {
      category: {
        BACKEND: 'bg-gradient-to-r from-emerald-300 to-emerald-500',
        FRONTEND: 'bg-gradient-to-r from-cyan-300 to-cyan-500',
        MOBILE: 'bg-gradient-to-r from-amber-400 to-amber-500',
      },
    },
    defaultVariants: {
      category: 'FRONTEND',
    },
  },
)

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  Icon: LucideIcon
  as?: 'button' | 'a'
  link?: string
}

export function Button({
  as = 'button',
  link = '#',
  children,
  className,
  category = 'FRONTEND',
  Icon,
}: ButtonProps) {
  const Element = as === 'a' ? 'a' : 'button'

  return (
    <Element
      className={cn(buttonVariants({ className, category }))}
      href={link}
    >
      <Icon size={20} className="size-5 flex-shrink-0 text-white" />
      {children}
    </Element>
  )
}
