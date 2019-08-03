// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  children: React.Node,
  onClick?: void => void,
  disabled?: boolean,
  secondary?: boolean,
}

export const Button = ({ children, onClick, disabled, secondary }: Props) => (
  <ButtonEl onClick={onClick} secondary={secondary} disabled={disabled}>
    {children}
  </ButtonEl>
)

export const ButtonEl = styled.button`
  height: 40px;
  min-width: 80px;
  line-height: 40px;
  padding: 0 25px;
  margin: 0;
  border-radius: 3px;
  box-sizing: border-box;
  user-select: none;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  font-family: Montserrat, sans-serif;

  background: #297485;
  border: 1px solid #297485;
  color: #fff;
  &:focus {
    box-shadow: inset 0 0 0 1px transparent, 0 0 0 3px #dcdcdc;
  }
  &:not(:disabled) {
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.4;
  }

  ${({ secondary }) =>
    secondary &&
    css`
      background: none;
      border: 1px solid #297485;
      color: #297485;
    `}
`
