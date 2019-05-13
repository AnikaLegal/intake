// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React from 'react'

import { storiesOf } from '@storybook/react'

import { TestBox } from './utils'

export const stories = storiesOf('Form fields', module)

stories.add('Hello', () => (
  <TestBox flex width={900} height={400}>
    <h1>Hello World</h1>
  </TestBox>
))
