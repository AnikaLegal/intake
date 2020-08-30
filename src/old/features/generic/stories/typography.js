// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React from 'react'

import { number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { TestBox } from './utils'

export const stories = storiesOf('Typography', module)

stories.add('Header', () => (
  <TestBox width={600}>
    <div>
      <h1>Biggest Header</h1>
      <h2>Average Header</h2>
      <h3>Small Header</h3>
      <h4>Tiny Header</h4>
      <h5>Micro Header</h5>
    </div>
  </TestBox>
))
