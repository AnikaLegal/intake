// @flow
import React from 'react'

import { format } from 'utils'

import { TextEl } from './text'

type Props = {
  value: number | string | void,
  onChange: (number | void) => void,
  disabled?: boolean,
  placeholder?: string,
  onFocus?: Function,
  onBlur?: Function,
}

export const NumberInput = ({
  value,
  onChange,
  disabled,
  placeholder,
  onFocus,
  onBlur,
}: Props) => {
  return (
    <TextEl
      type="text"
      inputMode="numeric"
      value={format.integer.toString(value)}
      onChange={e => onChange(format.integer.toValue(e.target.value))}
      disabled={disabled}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}
