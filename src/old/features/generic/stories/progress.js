// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'
import styled from 'styled-components'

import { number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

import { TestBox } from './utils'
import { StepProgress } from 'features/generic'

export const stories = storiesOf('Progress', module)

stories.add('Step Progress', () => (
  <TestBox width={1200}>
    <StepProgress
      current={number('current step', 2)}
      steps={['Problem', 'Landlord', 'Agency', 'Preferences']}
    />
  </TestBox>
))
