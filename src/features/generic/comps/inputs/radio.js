// @flow
import React from 'react'
import styled, { css } from 'styled-components'

type Option = {
  label: string,
  value: any,
}

type Props = {
  value: any,
  onChange: any => void,
  disabled?: boolean,
  options: Array<Option>,
}

export const RadioInput = ({ value, onChange, disabled, options }: Props) => (
  <div>
    {options.map(({ label, value: val }) => (
      <RadioEl key={label}>
        <input
          onChange={e => onChange(e.target.value)}
          type="radio"
          value={val}
          checked={val === value}
        />
        <label>{label}</label>
      </RadioEl>
    ))}
  </div>
)

const RadioEl = styled.div`
  min-height: 30px;
  display: flex;
  align-items: end;
  input {
    margin-right: 1rem;
  }
`
