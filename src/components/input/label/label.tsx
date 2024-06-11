import { ComponentProps } from 'react'

import { cn } from '../../../lib/tailwind-merge'

export function InputLabel({
  children,
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex items-center justify-center gap-1', className)}
      {...props}
    >
      {children}
    </div>
  )
}
