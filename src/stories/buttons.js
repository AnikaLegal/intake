// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, number } from '@storybook/addon-knobs'
import { BigButton, Button, Icon } from '../design'

export const stories = storiesOf('Buttons', module)

stories.add('Big Button', () => (
  <>
    <BigButton disabled={boolean('Disabled', false)} primary>
      Let's get started
    </BigButton>
    <BigButton disabled={boolean('Disabled', false)}>Abandon case</BigButton>
  </>
))

stories.add('Button', () => (
  <>
    <Button disabled={boolean('Disabled', false)} primary Icon={Icon.Tick}>
      OK
    </Button>
    <Button disabled={boolean('Disabled', false)}>Cancel</Button>
  </>
))

stories.add('Loading Button', () => (
  <>
    <Button
      disabled={boolean('Disabled', false)}
      primary
      Icon={Icon.LoadingSpinner}
    >
      Submitting
    </Button>
    <Button disabled={boolean('Disabled', false)}>Cancel</Button>
  </>
))
