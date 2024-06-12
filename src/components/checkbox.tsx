import { Check } from 'lucide-react'
import { ComponentProps, forwardRef } from 'react'

import { Category } from '../types/videos'

interface CheckboxProps extends ComponentProps<'input'> {
  category: Category
  label: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ name, label, category, ...props }, ref) => {
    return (
      <label
        htmlFor={name}
        className="group flex w-full items-center justify-start gap-2"
      >
        <div
          className="flex size-5 items-center justify-center rounded-md border-b-2 border-solid border-neutral-400 bg-neutral-800 group-has-[:checked]:border-black/30 group-has-[:checked]:data-[category=BACKEND]:bg-emerald-500 group-has-[:checked]:data-[category=FRONTEND]:bg-cyan-500 group-has-[:checked]:data-[category=MOBILE]:bg-amber-500"
          data-category={category}
        >
          <Check
            className="hidden size-4 text-white group-has-[:checked]:flex"
            strokeWidth={4}
          />
        </div>
        <span>{label}</span>
        <input
          className="sr-only"
          name={name}
          id={name}
          type="checkbox"
          ref={ref}
          {...props}
        />
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
