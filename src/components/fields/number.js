// @flow
import React from 'react'

import type { FieldProps } from './types'

// FIXME: antd
export const DollarField = ({ field, onChange, value }: FieldProps) => null
// <InputNumber
//   size="large"
//   defaultValue={0}
//   min={0}
//   formatter={value =>
//     `$ ${String(value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
//   }
//   parser={value => value.replace(/\$\s?|(,*)/g, '')}
//   placeholder={field.placeholder}
//   onChange={onChange}
//   style={{ width: '300px ' }}
// />

export const NumberField = ({ field, onChange }: FieldProps) => null
// <InputNumber
//   size="large"
//   defaultValue={0}
//   min={0}
//   placeholder={field.placeholder}
//   onChange={onChange}
//   style={{ width: '300px ' }}
// />
