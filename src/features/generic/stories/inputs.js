// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'
import styled from 'styled-components'

import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import { TestBox } from './utils'
import {
  Button,
  DollarInput,
  NumberInput,
  DateInput,
  TextInput,
  TextareaInput,
} from '../comps'

export const stories = storiesOf('Inputs', module)

stories.add('Multi Select', () => <div />)
stories.add('Dropdown', () => <div />)
stories.add('Multi Dropdown', () => <div />)
stories.add('Radio', () => <div />)
stories.add('Multi Buttons', () => <div />)
stories.add('Image upload', () => <div />)

const DollarContainer = () => {
  const [val, setVal] = useState('')
  return (
    <React.Fragment>
      <DollarInput
        value={val}
        onChange={setVal}
        disabled={boolean('Disabled', false)}
        placeholder="Enter your thing"
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
  return (
    <React.Fragment>
      <NumberInput
        value={val}
        onChange={setVal}
        disabled={boolean('Disabled', false)}
        placeholder="Enter your thing"
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

stories.add('Button', () => (
  <TestBox width={600} height={300}>
    <Button
      onClick={() => alert('A button')}
      disabled={boolean('Disabled', false)}
      secondary={boolean('Secondary', false)}
    >
      A button
    </Button>
  </TestBox>
))

const DateContainer = () => {
  const [val, setVal] = useState('')
  return (
    <React.Fragment>
      <DateInput
        value={val}
        onChange={setVal}
        disabled={boolean('Disabled', false)}
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

const TextareaContainer = () => {
  const [val, setVal] = useState('')
  return (
    <React.Fragment>
      <TextareaInput
        value={val}
        onChange={setVal}
        disabled={boolean('Disabled', false)}
        placeholder="Enter your thing"
      />
      <p>{val}</p>
    </React.Fragment>
  )
}
stories.add('Textarea', () => (
  <TestBox width={600} height={300}>
    <TextareaContainer />
  </TestBox>
))

const TextContainer = () => {
  const [val, setVal] = useState('')
  return (
    <React.Fragment>
      <TextInput
        value={val}
        onChange={setVal}
        disabled={boolean('Disabled', false)}
        placeholder="Enter your thing"
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
