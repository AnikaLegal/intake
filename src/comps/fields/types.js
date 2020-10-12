//@flow
import * as React from 'react'
import type { Field, Upload, Data } from 'types'

export type FormFieldProps = {
  onNext: (any) => void,
  onSkip: (any) => void,
  onChange: (any) => void,
  onUpload?: (File) => Promise<Upload>,
  field: Field,
  data: Data,
  value: any,
  isLoading: boolean,
  children: React.Node,
}
