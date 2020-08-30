// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'
import styled from 'styled-components'

import { storiesOf } from '@storybook/react'

import { TestBox } from './utils'
import { Page, Layout, Warning } from '../comps'

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
stories.add('Warning', () => (
  <TestBox width={1000} height={500}>
    <h1>Some stuff</h1>
    <p>
      But, my dear sister, can I be happy, even supposing the best, in accepting
      a man whose sisters and friends are all wishing him to marry elsewhere? My
      younger sister has left all her friends--has eloped; has thrown herself
      into the power of--of Mr. Wickham. I should take him, even on _my_ slight
      acquaintance, to be an ill-tempered man.
    </p>
    <Warning>Oh no something happened</Warning>
    <p>
      Hear me in silence. I am not afraid of being overpowered by the
      impression. But, however, he is very welcome to come to Netherfield, if he
      likes it.
    </p>
  </TestBox>
))
