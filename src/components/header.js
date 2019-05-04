import React from 'react'
import styled from 'styled-components'

import { IMAGES } from 'consts'

export const Header = ({ children }) => (
  <StyledHeader>
    <img src={IMAGES.LOGO} height="50" />
  </StyledHeader>
)

const StyledHeader = styled.div`
  padding: 1rem;
  box-shadow: 0 1px 3px 0 rgba(21, 27, 38, 0.15);
`
