// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import type { Node } from 'react'

type Props = {
  children: Node,
  fadeIn?: boolean,
}

export const Page = ({ children, fadeIn }: Props) => (
  <StyledPage fadeIn={fadeIn}>{children}</StyledPage>
)

const StyledPage = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  max-width: 800px;
  flex-grow: 1;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  ${({ fadeIn }) =>
    fadeIn &&
    css`
      animation: fade-in 0.3s;
    `}
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
