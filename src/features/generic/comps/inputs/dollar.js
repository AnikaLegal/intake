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

export const DollarInput = ({
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
      value={format.dollars.toString(value)}
      onChange={e => onChange(format.dollars.toValue(e.target.value))}
      disabled={disabled}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}
