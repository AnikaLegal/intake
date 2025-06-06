//@flow
import * as React from 'react'
import type { Field, Upload, Data } from 'types'

export type FormFieldProps = {
  onNext: (e: any) => void,
  onSkip: (e: any) => void,
  onChange: (any) => void,
  onUpload?: (File) => Promise<Upload>,
  field: Field,
  data: Data,
  value: any,
  children: React.Node,
  isLoading: boolean,
}
