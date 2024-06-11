import { LucideIcon } from 'lucide-react'

interface InputLabelIconProps {
  Icon: LucideIcon
}

export function InputLabelIcon({ Icon }: InputLabelIconProps) {
  return <Icon className="h-4 w-4 text-inherit" />
}
