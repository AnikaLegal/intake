// @flow
import React from 'react'
import styled from 'styled-components'
import type { Node } from 'react'

export const Page = ({ children }: { children: Node }) => (
  <StyledPage>{children}</StyledPage>
)

const StyledPage = styled.div`
  max-width: 800px;
  flex-grow: 1;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`
