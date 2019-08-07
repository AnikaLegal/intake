// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'
import styled from 'styled-components'

import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import { TestBox } from './utils'
import { Field, FieldGroup, TextInput, DateInput } from '../comps'

export const stories = storiesOf('Forms', module)

stories.add('Field', () => <FieldStory />)
const FieldStory = () => {
  const [x, setX] = useState('It was a scary dream')
  const [y, setY] = useState('It was a scary duck')
  return (
    <TestBox width={600}>
      <Field
        prompt="Tell us about your dreams"
        help="You don't need to tell us everything,"
        errors={boolean('Errors', false) ? ['There are too many ducks.'] : []}
        required={boolean('Required', false)}
      >
        <TextInput value={x} onChange={setX} />
      </Field>
      <Field
        prompt="Tell us about your ducks"
        help="What were they like?,"
        errors={[]}
        required={false}
      >
        <TextInput value={y} onChange={setY} />
      </Field>
    </TestBox>
  )
}

stories.add('Field Group', () => <FieldGroupStory />)
const FieldGroupStory = () => {
  const [w, setW] = useState('Bob Dole')
  const [x, setX] = useState('123 Fake St, Armadale')
  const [y, setY] = useState('')
  const [z, setZ] = useState('matt@gmail.com')

  return (
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
          <TextInput value={w} onChange={setW} />
        </FieldGroup.Field>
        <FieldGroup.Field
          label="Address"
          errors={
            boolean('Errors 2', false) ? ['There are too many ducks.'] : []
          }
          required={true}
        >
          <TextInput value={x} onChange={setX} />
        </FieldGroup.Field>
        <FieldGroup.Field label="Contact Date" errors={[]} required={true}>
          <DateInput value={y} onChange={setY} />
        </FieldGroup.Field>
        <FieldGroup.Field label="Email" errors={[]} required={true}>
          <TextInput value={z} onChange={setZ} />
        </FieldGroup.Field>
      </FieldGroup>
    </TestBox>
  )
}
