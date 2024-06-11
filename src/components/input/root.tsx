import { ComponentProps } from 'react'

import { cn } from '../../lib/tailwind-merge'
import { Category } from '../../types/videos'

interface InputRootProps extends ComponentProps<'label'> {
  category: Category
}

export function InputRoot({
  children,
  className,
  category,
  ...props
}: InputRootProps) {
  return (
    <label
      className={cn(
        'relative flex h-16 w-full cursor-pointer flex-col items-start justify-center rounded-lg border-b-2 border-solid border-neutral-400 bg-neutral-800 px-3 py-2 transition-colors duration-300 ease-in-out has-[[aria-label=error]]:border-red-400 has-[[aria-label=error]]:text-red-400 focus-within:data-[category=BACKEND]:border-emerald-500 focus-within:data-[category=FRONTEND]:border-cyan-500 focus-within:data-[category=MOBILE]:border-amber-400 focus-within:data-[category=null]:border-gray-500 focus-within:data-[category=BACKEND]:text-emerald-500 focus-within:data-[category=FRONTEND]:text-cyan-500 focus-within:data-[category=MOBILE]:text-amber-400 focus-within:data-[category=null]:text-gray-500',
        className,
      )}
      data-category={category}
      {...props}
    >
      {children}
    </label>
  )
}
