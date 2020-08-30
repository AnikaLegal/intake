// @flow
import React from 'react'
import styled from 'styled-components'

import { IMAGES } from 'consts'

export const Header = () => (
  <StyledHeader>
    <img src={IMAGES.LOGO.TEXT.WHITE.SVG} height="50" />
  </StyledHeader>
)

const StyledHeader = styled.div`
  padding: 1rem;
  background: #008897;
`
