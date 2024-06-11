import { ComponentProps, forwardRef } from 'react'

import { cn } from '../../lib/tailwind-merge'

export const InputElement = forwardRef<
  HTMLInputElement,
  ComponentProps<'input'>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'size-full border-none bg-transparent text-base font-normal text-white outline-none',
        className,
      )}
      {...props}
    />
  )
})

InputElement.displayName = 'InputElement'
