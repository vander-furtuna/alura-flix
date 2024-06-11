import { InputElement } from './element'
import { InputError } from './error'
import { InputLabelIcon } from './label/icon'
import { InputLabel } from './label/label'
import { InputLabelText } from './label/text'
import { InputRoot } from './root'
import { InputTextarea } from './textarea'

export const Input = {
  Root: InputRoot,
  Label: InputLabel,
  LabelText: InputLabelText,
  LabelIcon: InputLabelIcon,
  Element: InputElement,
  Textarea: InputTextarea,
  Error: InputError,
}
