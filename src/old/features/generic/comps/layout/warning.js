// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import type { Node } from 'react'

type Props = {
  children: Node,
}

export const Warning = ({ children, fadeIn }: Props) => (
  <WarningEl>{children}</WarningEl>
)

const WarningEl = styled.div`
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;

  h1,
  h2,
  h3,
  h4,
  h5 {
    color: #856404;
  }
`
