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
  border-bottom: 2px solid rgba(21, 27, 38, 0.15);
`
