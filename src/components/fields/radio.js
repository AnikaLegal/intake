// @flow
import React from 'react'
import { Radio } from 'antd'

import type { FieldProps } from './types'

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}

export const RadioField = ({ onChange, field, value }: FieldProps) => (
  <Radio.Group onChange={e => onChange(e.target.value)} value={value}>
    {field.options &&
      field.options.map(({ label, value }) => (
        <Radio key={label} style={radioStyle} value={value}>
          {label}
        </Radio>
      ))}
  </Radio.Group>
)

export const RadioButtonField = ({ onChange, field, value }: FieldProps) => (
  <Radio.Group
    buttonStyle="solid"
    onChange={e => onChange(e.target.value)}
    value={value}
  >
    {field.options &&
      field.options.map(({ label, value }) => (
        <Radio.Button key={label} value={value}>
          {label}
        </Radio.Button>
      ))}
  </Radio.Group>
)
