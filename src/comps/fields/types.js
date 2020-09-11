//@flow
import type { Field } from 'types'

export type FormFieldProps = {
  onNext: (any) => void,
  onSkip: (any) => void,
  onChange: (any) => void,
  field: Field,
  value: any,
  isLoading: boolean,
}
