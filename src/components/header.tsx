import { ComponentProps, ReactNode } from 'react'

import vanderFlixLogo from '../assets/vander-flix-logo.png'
import { cn } from '../lib/tailwind-merge'
import { Category } from '../types/videos'

interface HeaderProps extends ComponentProps<'header'> {
  children: ReactNode
  category?: Category
}

export function Header({
  children,
  className,
  category = 'FRONTEND',
  ...props
}: HeaderProps) {
  return (
    <header
      className={cn(
        'z-10 flex h-32 w-full justify-between bg-gradient-to-b to-transparent px-16 py-12 data-[category=BACKEND]:from-emerald-400/70 data-[category=FRONTEND]:from-cyan-400/70 data-[category=MOBILE]:from-amber-500/70',
        className,
      )}
      data-category={category}
      {...props}
    >
      <img src={vanderFlixLogo} alt="Logo vander.flix" className="h-8 w-auto" />

      {children}
    </header>
  )
}
