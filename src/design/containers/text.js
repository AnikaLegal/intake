// @flow
import * as React from 'react'
import styled from 'styled-components'

import { theme } from '../theme'

export const TextContainerOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const TextContainerInner = styled.div`
  width: 700px;
  padding-left: 16px;
  padding-right: 16px;
  @media (max-width: ${theme.screen.mobile}) {
    max-width: 700px;
  }
`

type Props = {
  children: React.Node,
}

export const TextContainer = ({ children }: Props) => (
  <TextContainerOuter>
    <TextContainerInner>{children}</TextContainerInner>
  </TextContainerOuter>
)
