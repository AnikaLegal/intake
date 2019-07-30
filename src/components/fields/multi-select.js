// @flow
import React from 'react'
import { Checkbox } from 'antd'

import type { FieldProps } from './types'

export const MultiSelectField = ({ onChange, field }: FieldProps) => (
  <Checkbox.Group onChange={onChange} options={field.options} />
)
