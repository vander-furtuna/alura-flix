import { Info } from 'lucide-react'

import { Tooltip } from '../tooltip'

interface InputErrorProps {
  error: string
}

export function InputError({ error }: InputErrorProps) {
  return (
    <div className="absolute right-3 top-2" aria-label="error">
      <Tooltip label={error}>
        <Info size={20} className="text-red-400" />
      </Tooltip>
    </div>
  )
}
