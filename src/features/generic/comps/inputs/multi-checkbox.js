// @flow
import React from 'react'
import styled, { css } from 'styled-components'

import { CheckboxInput } from './checkbox'

type Option = {
  label: string,
  value: any,
}

type Props = {
  values: Array<any> | void,
  onChange: (Array<any>) => void,
  disabled?: boolean,
  options: Array<Option>,
}

export const MultiCheckboxInput = ({
  values,
  onChange,
  disabled,
  options,
}: Props) => {
  const _values = values || []
  const onCheckboxChange = val => isActive => {
    const cleaned = _values.filter(v => v !== val)
    const newValues = isActive ? [...cleaned, val] : cleaned
    onChange(newValues)
  }
  return (
    <div>
      {options.map(({ label, value }) => (
        <CheckboxInput
          label={label}
          key={label}
          value={_values.includes(value)}
          disabled={disabled}
          onChange={onCheckboxChange(value)}
        />
      ))}
    </div>
  )
}
