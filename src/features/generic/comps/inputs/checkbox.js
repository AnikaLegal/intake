// @flow
import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  value: boolean,
  label: string,
  onChange: boolean => void,
  disabled?: boolean,
}

export const CheckboxInput = ({ value, label, onChange, disabled }: Props) => (
  <CheckboxEl>
    <input
      onChange={() => onChange(!value)}
      type="checkbox"
      value={value}
      disabled={disabled}
    />
    <label>{label}</label>
  </CheckboxEl>
)

const CheckboxEl = styled.div`
  min-height: 30px;
  display: flex;
  align-items: end;
  input {
    margin-right: 1rem;
  }
`
