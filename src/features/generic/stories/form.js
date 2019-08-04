// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'
import styled from 'styled-components'

import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import { TestBox } from './utils'
import { Field, TextInput } from '../comps'

export const stories = storiesOf('Forms', module)

stories.add('Field', () => (
  <TestBox width={600}>
    <Field
      prompt="Tell us about your dreams"
      help="You don't need to tell us everything,"
      errors={boolean('Errors', false) ? ['There are too many ducks.'] : []}
      required={boolean('Required', false)}
    >
      <TextInput value="It was a scary dream" onChange={() => {}} />
    </Field>
  </TestBox>
))
