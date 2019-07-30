// @flow
import type { Field as FieldType } from 'types'

export type FieldProps = {
  field: FieldType,
  valid: boolean,
  errors: Array<string>,
  value: string | any,
  onChange: Function,
  isCompact?: boolean,
}
