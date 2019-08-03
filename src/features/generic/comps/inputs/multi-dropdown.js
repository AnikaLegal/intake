// @flow
import React from 'react'
import ReactSelect from 'react-select'

import { SelectWrapperEl } from './dropdown'

type Option = { label: string, value: any }

type Props = {
  values: Array<any> | void,
  onChange: any => void,
  options: Array<Option>,
  disabled?: boolean,
  placeholder?: string,
}

export const MultiDropdownInput = ({
  values,
  onChange,
  options,
  disabled,
  placeholder,
}: Props) => {
  const _values = values || []
  const onSelectChange = (options, ...args) => {
    if (options) {
      onChange(options.map(o => o.value))
    }
  }
  return (
    <SelectWrapperEl>
      <ReactSelect
        isMulti
        className="react-select-container"
        classNamePrefix="react-select"
        value={options.filter(o => _values.includes(o.value))}
        options={options}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onSelectChange}
      />
    </SelectWrapperEl>
  )
}
