import { ComponentProps, forwardRef } from 'react'

import { cn } from '../../lib/tailwind-merge'

export const InputTextarea = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'size-full resize-none border-none bg-transparent text-base font-normal text-white outline-none',
        className,
      )}
      {...props}
    />
  )
})

InputTextarea.displayName = 'InputTextarea'
