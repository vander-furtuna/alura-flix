import * as RadixTooltip from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

interface TooltipProps {
  children: ReactNode
  label: string
}

export function Tooltip({ children, label }: TooltipProps) {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-[4px] bg-neutral-800 px-[15px] py-[10px] text-[15px] leading-none text-white will-change-[transform,opacity]"
            sideOffset={5}
          >
            {label}
            <RadixTooltip.Arrow className="fill-neutral-800" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
