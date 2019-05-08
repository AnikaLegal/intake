import React from 'react'
import styled, { css } from 'styled-components'

export const Layout = styled.div`
  min-height: calc(100vh - 84px);
  width: 100%;
  display: flex;
  ${props =>
    props.vertical &&
    css`
      flex-direction: column;
    `}
`
