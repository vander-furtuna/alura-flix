import { ComponentProps } from 'react'

import { cn } from '../../../lib/tailwind-merge'

export function InputLabelText({
  children,
  className,
  ...props
}: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'text-center font-sans text-xs font-semibold text-inherit',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
