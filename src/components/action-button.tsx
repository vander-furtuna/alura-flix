import { cva, VariantProps } from 'class-variance-authority'
import { PenLine, Trash } from 'lucide-react'
import { ComponentProps, useMemo } from 'react'

import { cn } from '../lib/tailwind-merge'

const actionButtonVariants = cva(
  'rounded-full p-2 gap-1 bg-black/40 flex group transition-all duration-500 items-center justify-center',
  {
    variants: {
      action: {
        delete: 'hover:bg-red-500',
        edit: 'hover:bg-white/30 hover:backdrop-blur-sm',
      },
    },
    defaultVariants: {
      action: 'edit',
    },
  },
)

interface ActionButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof actionButtonVariants> {}

export function ActionButton({
  className,
  action = 'edit',
  ...props
}: ActionButtonProps) {
  const Icon = useMemo(() => (action === 'delete' ? Trash : PenLine), [action])
  const label = useMemo(
    () => (action === 'delete' ? 'Excluir' : 'Editar'),
    [action],
  )

  return (
    <button
      className={cn(actionButtonVariants({ className, action }))}
      {...props}
    >
      <i>
        <Icon size={24} />
      </i>
      <span className="max-w-0 overflow-hidden text-base font-bold uppercase text-white transition-all duration-500 ease-in-out group-hover:max-w-40">
        {label}
      </span>
    </button>
  )
}
