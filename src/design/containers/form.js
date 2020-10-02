// @flow
import React from 'react'
import styled from 'styled-components'

import { theme } from '../theme'
import { FadeFooter } from '../footer'

const FormOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  @media (max-width: ${theme.screen.mobile}) {
    display: grid;
    margin: 0 -16px;
    padding: 0 16px;
    box-sizing: border-box;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      '.'
      'main'
      'footer';
  }
`

const FormChild = styled.div`
  width: 100%;
  max-width: 700px;
  @media (max-width: ${theme.screen.mobile}) {
    width: calc(100vw - 32px);
    justify-self: center;
    align-self: center;
  }
`

const FormContent = styled(FormChild)`
  grid-area: main;
`

const FormFooterEl = styled(FormChild)`
  margin-top: 30px;
  grid-area: footer;
  @media (max-width: ${theme.screen.mobile}) {
    margin-top: 0;
    align-self: end;
  }
`

const FormFooter = ({ children }: any) => (
  <FormFooterEl>
    {children}
    <FadeFooter />
  </FormFooterEl>
)

export const Form = {
  Outer: FormOuter,
  Content: FormContent,
  Footer: FormFooter,
}
