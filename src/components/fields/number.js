// @flow
import React from 'react'
import { InputNumber } from 'antd'

import type { FieldProps } from './types'

export const DollarField = ({ field, onChange, value }: FieldProps) => (
  <InputNumber
    size="large"
    defaultValue={0}
    min={0}
    formatter={value =>
      `$ ${String(value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    parser={value => value.replace(/\$\s?|(,*)/g, '')}
    placeholder={field.placeholder}
    onChange={onChange}
    style={{ width: '300px ' }}
  />
)

export const NumberField = ({ field, onChange }: FieldProps) => (
  <InputNumber
    size="large"
    defaultValue={0}
    min={0}
    placeholder={field.placeholder}
    onChange={onChange}
    style={{ width: '300px ' }}
  />
)
