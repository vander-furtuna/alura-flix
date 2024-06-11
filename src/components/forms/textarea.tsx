import { LucideIcon } from 'lucide-react'
import { ComponentProps, forwardRef } from 'react'

import { Category } from '../../types/videos'
import { Input } from '../input'

interface TextareaProps extends ComponentProps<'textarea'> {
  category: Category
  Icon: LucideIcon
  label: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ category, label, Icon, error, ...props }, ref) => {
    return (
      <Input.Root category={category} className="h-full">
        <Input.Label>
          <Input.LabelIcon Icon={Icon} />
          <Input.LabelText>{label}</Input.LabelText>
        </Input.Label>
        <Input.Textarea {...props} ref={ref} />
        {error && <Input.Error error={error} />}
      </Input.Root>
    )
  },
)

Textarea.displayName = 'Textarea'
