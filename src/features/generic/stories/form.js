// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'
import styled from 'styled-components'

import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import { TestBox } from './utils'
import { Field, FieldGroup, TextInput, DateInput } from '../comps'

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
    <Field
      prompt="Tell us about your ducks"
      help="What were they like?,"
      errors={[]}
      required={false}
    >
      <TextInput value="It was a scary duck" onChange={() => {}} />
    </Field>
  </TestBox>
))

stories.add('Field Group', () => (
  <TestBox width={600}>
    <FieldGroup
      prompt="Tell us about your landlord"
      help="You don't need to tell us everything,"
    >
      <FieldGroup.Field
        label="Name"
        errors={
          boolean('Errors 1', false)
            ? ['There are too many ducks.', 'That name is too long,']
            : []
        }
        required={false}
      >
        <TextInput value="Bob Dole" onChange={() => {}} />
      </FieldGroup.Field>
      <FieldGroup.Field
        label="Address"
        errors={boolean('Errors 2', false) ? ['There are too many ducks.'] : []}
        required={true}
      >
        <TextInput value="123 Fake St, Armadale" onChange={() => {}} />
      </FieldGroup.Field>
      <FieldGroup.Field label="Contact Date" errors={[]} required={true}>
        <DateInput value="" onChange={() => {}} />
      </FieldGroup.Field>
      <FieldGroup.Field label="Email" errors={[]} required={true}>
        <TextInput value="matt@gmail.com" onChange={() => {}} />
      </FieldGroup.Field>
    </FieldGroup>
  </TestBox>
))
