// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  children: React.Node,
  onClick?: void => void,
  disabled?: boolean,
  secondary?: boolean,
  skinny?: boolean,
  margin?: string,
}

export const Button = ({
  children,
  onClick,
  disabled,
  secondary,
  skinny,
  margin,
}: Props) => (
  <ButtonEl
    onClick={onClick}
    secondary={secondary}
    disabled={disabled}
    skinny={skinny}
    margin={margin}
  >
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
  font-weight: 500;
  font-family: Montserrat, sans-serif;

  background: #008897;
  border: 1px solid #008897;
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
      background: #fff;
      border: 1px solid rgba(0, 0, 0, 0.4);
      color: rgba(0, 0, 0, 0.75);
    `}
  ${({ skinny }) =>
    skinny &&
    css`
      height: 35px;
      padding: 0 15px;
      line-height: 30px;
    `}
  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}
`
