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
  <RadioWrapperEl>
    {options.map(({ label, value: val }) => (
      <RadioEl
        checked={val === value}
        key={label}
        disabled={disabled}
        onClick={onClick(val, disabled, onChange)}
      >
        {label}
      </RadioEl>
    ))}
  </RadioWrapperEl>
)

const onClick = (value, disabled, onChange) => () => {
  if (!disabled) {
    onChange(value)
  }
}

const RadioWrapperEl = styled.div`
  margin: 0 0 0 2rem;
`

const RadioEl = styled.div`
  min-height: 30px;
  margin: 0 0 0.5rem 0;
  cursor: pointer;
  &:before {
    content: '';
    border-radius: 100%;
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
