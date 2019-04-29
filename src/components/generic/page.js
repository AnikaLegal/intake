import React from 'react'
import styled from 'styled-components'

const StyledPage = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`

export const Page = ({ children }) =>
  <StyledPage>{children}</StyledPage>

