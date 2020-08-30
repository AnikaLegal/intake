// @flow
import React from 'react'
import styled from 'styled-components'

import { theme } from './theme'

const Header = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
  color: ${theme.color.grey.dark};
  margin: 0 0 20px 0;
  @media (max-width: ${theme.screen.mobile}) {
    margin: 0 0 16px 0;
    font-size: 20px;
    line-height: 20px;
  }
`

const Body = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  color: ${theme.color.grey.mid};
  margin: 0 0 15px 0;
  @media (max-width: ${theme.screen.mobile}) {
    margin: 0 0 12px 0;
    font-size: 16px;
    line-height: 16px;
  }
`

export const Text = { Header, Body }
