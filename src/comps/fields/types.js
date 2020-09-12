//@flow
import type { Field, Upload } from 'types'

export type FormFieldProps = {
  onNext: (any) => void,
  onSkip: (any) => void,
  onChange: (any) => void,
  onUpload?: (File) => Promise<Upload>,
  field: Field,
  value: any,
  isLoading: boolean,
}
