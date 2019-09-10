// @flow
import React from 'react'
import ReactSelect from 'react-select'
import styled from 'styled-components'

type Option = { label: string, value: any }

type Props = {
  value: any,
  onChange: any => void,
  options: Array<Option>,
  disabled?: boolean,
  placeholder?: string,
  onFocus?: Function,
  onBlur?: Function,
}

export const DropdownInput = ({
  value,
  onChange,
  options,
  disabled,
  placeholder,
  onFocus,
  onBlur,
}: Props) => (
  <SelectWrapperEl>
    <ReactSelect
      isSearchable={false}
      className="react-select-container"
      classNamePrefix="react-select"
      value={options.find(o => o.value === value)}
      options={options}
      disabled={disabled}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      // @noflow
      onChange={option => onChange(option.value)}
    />
  </SelectWrapperEl>
)

// See https://react-select.com/styles#using-classnames
export const SelectWrapperEl = styled.div`
  .react-select-container {
    .react-select__control {
      border-radius: 2px;
      border: 1px solid #babec5;
      &:hover {
        box-shadow: 0 0 0 2px #d4d7dc;
      }
    }
    .react-select__control--is-focused {
      border-color: #6bc4c9;
      box-shadow: 0 0 0 1px #6bc4c9;
      &:hover {
        box-shadow: 0 0 0 1px #6bc4c9;
      }
    }
    .react-select__option--is-focused {
      background-color: rgba(#6bc4c9, 0.2);
    }
    .react-select__option--is-selected {
      background-color: rgba(#6bc4c9, 0.9);
    }
  }
`
