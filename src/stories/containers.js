// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'

import { ErrorMessage, Text, BigButton, StepProgress } from '../design'

export const stories = storiesOf('Misc', module)

stories.add('Error Message', () => (
  <>
    <ErrorMessage>Hold on, you forgot your keys</ErrorMessage>
    <ErrorMessage>Also, you forgot your wallet</ErrorMessage>
  </>
))

stories.add('Step Progress', () => (
  <StepProgress
    current={number('current step', 2)}
    steps={['Problem', 'Landlord', 'Agency', 'Preferences']}
  />
))
