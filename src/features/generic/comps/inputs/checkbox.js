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
  <CheckboxEl
    checked={value}
    disabled={disabled}
    onClick={onClick(value, disabled, onChange)}
  >
    {label}
  </CheckboxEl>
)

const onClick = (value, disabled, onChange) => () => {
  if (!disabled) {
    onChange(!value)
  }
}

const CheckboxEl = styled.div`
  min-height: 30px;
  margin: 0 0 0.5rem 0;
  cursor: pointer;
  &:before {
    content: '';
    background: #fff;
    border: 0.1em solid rgba(0, 0, 0, 0.75);
    background-color: rgba(255, 255, 255, 0.8);
    display: block;
    box-sizing: border-box;
    float: left;
    width: 1em;
    height: 1em;
    margin-left: -1.5em;
    margin-top: 0.15em;
    vertical-align: top;
    text-align: center;
    transition: all 0.1s ease-out;
    ${({ checked }) =>
      checked &&
      css`
        background-color: #297485;
        box-shadow: inset 0 0 0 0.15em rgba(255, 255, 255, 0.95);
      `}
  }
`
