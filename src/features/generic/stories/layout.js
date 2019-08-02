// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'
import styled from 'styled-components'

import { storiesOf } from '@storybook/react'

import { TestBox } from './utils'
import { Page, Layout } from '../comps'

export const stories = storiesOf('Layout', module)

stories.add('Page', () => (
  <TestBox width={1000} height={500}>
    <PageOuter>
      <Page>
        <PageInner>
          <h1>Hello World</h1>
        </PageInner>
      </Page>
    </PageOuter>
  </TestBox>
))
const PageOuter = styled.div`
  background: grey;
  height: 100%;
  width: 100%;
`
const PageInner = styled.div`
  background: white;
  height: 300px;
  padding: 10px;
  width: 100%;
`
