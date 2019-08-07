// @flow
import React from 'react'
import ReactSelect from 'react-select'
import styled from 'styled-components'

import { SelectWrapperEl } from './dropdown'

type Option = { label: string, value: any }

type Props = {
  values: Array<any> | void,
  onChange: any => void,
  options: Array<Option>,
  disabled?: boolean,
  placeholder?: string,
  onFocus?: Function,
  onBlur?: Function,
}

export const MultiDropdownInput = ({
  values,
  onChange,
  options,
  disabled,
  placeholder,
  onFocus,
  onBlur,
}: Props) => {
  const _values = values || []
  const onSelectChange = (options, ...args) => {
    if (options) {
      onChange(options.map(o => o.value))
    }
  }
  return (
    <MultiSelectWrapperEl>
      <ReactSelect
        isMulti
        className="react-select-container"
        classNamePrefix="react-select"
        value={options.filter(o => _values.includes(o.value))}
        options={options}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onSelectChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </MultiSelectWrapperEl>
  )
}

const MultiSelectWrapperEl = styled(SelectWrapperEl)`
  .react-select__multi-value {
    border: 1px solid #95b9cc;
    background: #fff;
    .react-select__multi-value__label {
      padding: 0.2rem 0.5rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.65);
    }
    .react-select__multi-value__remove {
      background: #95b9cc;
      border-radius: 0;
      cursor: pointer;
      color: white;
    }
  }
`
