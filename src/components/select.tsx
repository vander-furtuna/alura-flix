import * as RadixSelect from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp, Tag } from 'lucide-react'
import React from 'react'

import { cn } from '../lib/tailwind-merge'
import { Category } from '../types/videos'
import { Input } from './input'

export type Option = {
  value: string
  label: string
}

export interface SelectProps extends RadixSelect.SelectProps {
  category: Category
  options: Option[]
  error?: string
}

export function Select({ category, options, error, ...props }: SelectProps) {
  return (
    <RadixSelect.Root {...props}>
      <RadixSelect.Trigger
        className="relative flex h-16 w-full flex-col items-start justify-center gap-[5px] rounded-lg border-b-2 border-neutral-400 bg-neutral-800 px-3 py-2 text-base leading-none text-white outline-none transition-colors duration-300 ease-in-out has-[[aria-label=error]]:border-red-400 has-[[aria-label=error]]:text-red-400 focus:data-[category=BACKEND]:border-emerald-500 focus:data-[category=FRONTEND]:border-cyan-500 focus:data-[category=MOBILE]:border-amber-400 focus:data-[category=null]:border-gray-500 focus:data-[category=BACKEND]:text-emerald-500 focus:data-[category=FRONTEND]:text-cyan-500 focus:data-[category=MOBILE]:text-amber-400 focus:data-[category=null]:text-gray-500"
        aria-label="Food"
        data-category={category}
      >
        <Input.Label>
          <Input.LabelIcon Icon={Tag} />
          <Input.LabelText>Categoria</Input.LabelText>
        </Input.Label>
        <div className="inline-flex w-full items-center justify-between">
          <RadixSelect.Value className="text-white" />
          <RadixSelect.Icon className="text-white">
            <ChevronDown />
          </RadixSelect.Icon>
        </div>
        {error && <Input.Error error={error} />}
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="overflow-hidden rounded-md bg-neutral-800">
          <RadixSelect.ScrollUpButton className="flex h-7 cursor-default items-center justify-center bg-neutral-800 text-white">
            <ChevronUp />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="p-[5px]">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-neutral-800 text-white">
            <ChevronDown />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

const SelectItem = React.forwardRef<
  HTMLDivElement,
  RadixSelect.SelectItemProps
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <RadixSelect.Item
      className={cn(
        'data-[highlighted]:bg-violet9 relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-white/80 data-[disabled]:pointer-events-none data-[disabled]:text-white/70 data-[highlighted]:text-white data-[highlighted]:outline-none',
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <Check size={16} />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
})

SelectItem.displayName = 'SelectItem'
