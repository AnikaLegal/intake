import React from 'react'
import styled from 'styled-components'

export const Page = ({ children }) => <StyledPage>{children}</StyledPage>

const StyledPage = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`
