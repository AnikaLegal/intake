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
export const Message = styled.div`
  background: white;
  padding: 2rem;
  box-shadow: 1px 1px 4px 0 #aaa;
`

export const Letter = styled.div`
  background: rgba(240, 242, 245, 0.15);
  box-shadow: 1px 1px 4px 0 #aaa;
  padding: 1rem;
`
