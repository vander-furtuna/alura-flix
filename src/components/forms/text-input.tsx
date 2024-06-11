import { LucideIcon } from 'lucide-react'
import { ComponentProps, forwardRef } from 'react'

import { Category } from '../../types/videos'
import { Input } from '../input'

interface TextInputProps extends ComponentProps<'input'> {
  category: Category
  Icon: LucideIcon
  label: string
  error?: string
}

// export function TextInput({
//   category,
//   label,
//   Icon,
//   error,
//   ...props
// }: TextInputProps) {
//   return (
//     <Input.Root category={category}>
//       <Input.Label>
//         <Input.LabelIcon Icon={Icon} />
//         <Input.LabelText>{label}</Input.LabelText>
//       </Input.Label>
//       <Input.Element type="text" {...props} />
//       {error && <Input.Error error={error} />}
//     </Input.Root>
//   )
// }

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ category, label, Icon, error, ...props }, ref) => {
    return (
      <Input.Root category={category}>
        <Input.Label>
          <Input.LabelIcon Icon={Icon} />
          <Input.LabelText>{label}</Input.LabelText>
        </Input.Label>
        <Input.Element type="text" {...props} ref={ref} />
        {error && <Input.Error error={error} />}
      </Input.Root>
    )
  },
)

TextInput.displayName = 'TextInput'
