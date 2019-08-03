// @flow
import React from 'react'
import styled from 'styled-components'

type Props = {
  value: string | number | void,
  onChange: string => void,
  disabled?: boolean,
  placeholder?: string,
  rows?: number,
}

export const TextareaInput = ({
  value,
  onChange,
  disabled,
  placeholder,
  rows = 6,
}: Props) => (
  <TextareaEl
    type="text"
    value={value || ''}
    onChange={e => onChange(e.target.value)}
    disabled={disabled}
    placeholder={placeholder}
    rows={rows}
  />
)

export const TextareaEl = styled.textarea`
  width: 100%;
  display: block;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #babec5;
  border-radius: 4px;
  outline: 0;
  font-size: 14px;
  font-weight: 400;
  font-family: Montserrat, sans-serif;
  &:disabled {
    background: #eee;
    color: #666;
  }
  &:hover:not(:disabled) {
    border-color: #8d9096;
    box-shadow: 0 0 0 2px #d4d7dc;
  }
  &:focus {
    border-color: #95b9cc;
  }
`
