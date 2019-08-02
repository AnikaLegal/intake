// @flow
import React from 'react'

import type { FieldProps } from './types'

// FIXME: antd
export const DropdownField = ({ onChange, field, value }: FieldProps) => null
// <Select
//   size="large"
//   onChange={onChange}
//   defaultValue={value || undefined}
//   placeholder={field.placeholder}
// >
//   {field.options &&
//     field.options.map(({ label, value }) => (
//       <Select.Option key={label} value={value}>
//         {label}
//       </Select.Option>
//     ))}
// </Select>

export const MultiDropdownField = ({ onChange, field, value }: FieldProps) =>
  null
// <Select
//   size="large"
//   mode="multiple"
//   onChange={onChange}
//   defaultValue={value || undefined}
//   placeholder={field.placeholder}
// >
//   {field.options &&
//     field.options.map(({ label, value }) => (
//       <Select.Option key={label} value={value}>
//         {label}
//       </Select.Option>
//     ))}
// </Select>
