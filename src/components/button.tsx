import { cva, VariantProps } from 'class-variance-authority'
import { LucideIcon } from 'lucide-react'
import { ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'

import { cn } from '../lib/tailwind-merge'

const buttonVariants = cva(
  'inline-flex items-center justify-center px-4 py-3 gap-2 text-white rounded-lg uppercase font-bold text-base flex-shrink-0 h-fit w-fit',
  {
    variants: {
      category: {
        BACKEND: ' from-emerald-300 to-emerald-500  border-emerald-500',
        FRONTEND: ' from-cyan-300 to-cyan-500  border-cyan-500',
        MOBILE: ' from-amber-400 to-amber-500  border-amber-500',
      },
      variant: {
        outlined: 'bg-white/20 border-solid border-2',
        filled: 'bg-gradient-to-r border-none',
      },
    },

    defaultVariants: {
      category: 'FRONTEND',
      variant: 'filled',
    },
  },
)

interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  Icon?: LucideIcon
  link?: string
}

export function Button({
  link = '#',
  children,
  className,
  category = 'FRONTEND',
  variant,
  Icon,
  onClick,
  ...props
}: ButtonProps) {
  const navigate = useNavigate()

  return (
    <button
      className={cn(buttonVariants({ className, category, variant }))}
      onClick={(event) => {
        if (onClick) {
          onClick(event)
        }
        navigate(link)
      }}
      {...props}
    >
      {Icon && <Icon size={20} className="size-5 flex-shrink-0 text-white" />}
      {children}
    </button>
  )
}
