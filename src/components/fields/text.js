// @flow
import React from 'react'
import { Input } from 'antd'

import type { FieldProps } from './types'

export const TextField = ({ field, onChange, value }: FieldProps) => (
  <Input
    value={value}
    placeholder={field.placeholder}
    // @noflow
    onChange={e => onChange(e.target.value)}
  />
)

export const TextAreaField = ({ field, onChange, value }: FieldProps) => (
  <Input.TextArea
    rows={4}
    value={value}
    placeholder={field.placeholder}
    onChange={e => onChange(e.target.value)}
  />
)
