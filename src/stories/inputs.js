// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'
import styled from 'styled-components'

import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import { TestBox } from './utils'
import { Field } from 'components'
import { FIELD_TYPES } from 'consts'

export const stories = storiesOf('Inputs', module)

/*
TODO - multiple fields
  FIELD_TYPES.MULTI_SELECT
  FIELD_TYPES.DROPDOWN
  FIELD_TYPES.MULTI_DROPDOWN
  FIELD_TYPES.RADIO
  FIELD_TYPES.RADIO_BTN
  FIELD_TYPES.FILE
*/

const TextContainer = () => {
  const [val, setVal] = useState('')
  const field = {
    name: 'TextField',
    type: FIELD_TYPES.TEXT,
    prompt: text('Prompt', 'What is your problem?'),
    help: text('Help', 'Here is some help stuff'),
    placeholder: 'Enter your thing',
    rules: [],
  }
  return (
    <React.Fragment>
      <Field
        field={field}
        valid={boolean('Is valid', true)}
        errors={boolean('Has errors', false) ? ['This field has an error'] : []}
        value={val}
        onChange={setVal}
      />
      <p>{val}</p>
    </React.Fragment>
  )
}
stories.add('Text', () => (
  <TestBox width={600} height={300}>
    <TextContainer />
  </TestBox>
))

const TextAreaContainer = () => {
  const [val, setVal] = useState('')
  const field = {
    name: 'TextField',
    type: FIELD_TYPES.TEXTAREA,
    prompt: text('Prompt', 'What is your problem?'),
    help: text('Help', 'Here is some help stuff'),
    placeholder: 'Enter your thing',
    rules: [],
  }
  return (
    <React.Fragment>
      <Field
        field={field}
        valid={boolean('Is valid', true)}
        errors={boolean('Has errors', false) ? ['This field has an error'] : []}
        value={val}
        onChange={setVal}
      />
      <p>{val}</p>
    </React.Fragment>
  )
}
stories.add('Textarea', () => (
  <TestBox width={600} height={300}>
    <TextAreaContainer />
  </TestBox>
))

const DollarContainer = () => {
  const [val, setVal] = useState('')
  const field = {
    name: 'DollarField',
    type: FIELD_TYPES.DOLLAR,
    prompt: text('Prompt', 'What is your problem?'),
    help: text('Help', 'Here is some help stuff'),
    placeholder: 'Enter your thing',
    rules: [],
  }
  return (
    <React.Fragment>
      <Field
        field={field}
        valid={boolean('Is valid', true)}
        errors={boolean('Has errors', false) ? ['This field has an error'] : []}
        value={val}
        onChange={setVal}
      />
      <p>{val}</p>
    </React.Fragment>
  )
}
stories.add('Dollar', () => (
  <TestBox width={600} height={300}>
    <DollarContainer />
  </TestBox>
))

const NumberContainer = () => {
  const [val, setVal] = useState('')
  const field = {
    name: 'NumberField',
    type: FIELD_TYPES.NUMBER,
    prompt: text('Prompt', 'What is your problem?'),
    help: text('Help', 'Here is some help stuff'),
    placeholder: 'Enter your thing',
    rules: [],
  }
  return (
    <React.Fragment>
      <Field
        field={field}
        valid={boolean('Is valid', true)}
        errors={boolean('Has errors', false) ? ['This field has an error'] : []}
        value={val}
        onChange={setVal}
      />
      <p>{val}</p>
    </React.Fragment>
  )
}
stories.add('Number', () => (
  <TestBox width={600} height={300}>
    <NumberContainer />
  </TestBox>
))

const DateContainer = () => {
  const [val, setVal] = useState('')
  const field = {
    name: 'DateField',
    type: FIELD_TYPES.DATE,
    prompt: text('Prompt', 'What is your problem?'),
    help: text('Help', 'Here is some help stuff'),
    placeholder: 'Enter your thing',
    rules: [],
  }
  return (
    <React.Fragment>
      <Field
        field={field}
        valid={boolean('Is valid', true)}
        errors={boolean('Has errors', false) ? ['This field has an error'] : []}
        value={val}
        onChange={setVal}
      />
      <p>{val}</p>
    </React.Fragment>
  )
}
stories.add('Date', () => (
  <TestBox width={600} height={300}>
    <DateContainer />
  </TestBox>
))
