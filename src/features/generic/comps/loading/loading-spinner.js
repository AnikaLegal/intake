// @flow
import * as React from 'react'
import styled from 'styled-components'

import { LoadingSpinnerSVG } from './loading-svg'

type Props = {
  size?: number,
  children?: React.Node,
}

export const LoadingSpinner = ({ size = 120, children }: Props) => (
  <LoadingWrapper>
    <LoadingSpinnerSVG size={size} />
    {children}
  </LoadingWrapper>
)

const LoadingWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`
