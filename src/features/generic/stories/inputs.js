// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'
import styled from 'styled-components'

import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import { TestBox } from './utils'
import { DummyImageUploader } from 'utils'
import { ImageUploadContainer } from '../containers'
import {
  Button,
  DollarInput,
  NumberInput,
  DateInput,
  TextInput,
  TextareaInput,
  CheckboxInput,
  MultiCheckboxInput,
  DropdownInput,
  MultiDropdownInput,
  ButtonChoiceInput,
  RadioInput,
} from '../comps'

export const stories = storiesOf('Inputs', module)

stories.add('Image Uploader', () => {
  const uploader = new DummyImageUploader()
  return (
    <TestBox width={600} height={300}>
      <ImageUploadContainer
        uploader={uploader}
        disabled={boolean('Disabled', false)}
      />
    </TestBox>
  )
})

const MultiDropdownContainer = () => {
  const [val, setVal] = useState()
  return (
    <React.Fragment>
      <MultiDropdownInput
        values={val}
        onChange={setVal}
        disabled={boolean('Disabled', false)}
        placeholder="Enter your thing"
        options={[
          { label: text('Label', 'Yes'), value: 'yes' },
          { label: 'No', value: 'no' },
          { label: 'Maybe', value: 'maybe' },
        ]}
      />
      <p>{(val || []).join(', ')}</p>
    </React.Fragment>
  )
}
stories.add('Multi Dropdown', () => (
  <TestBox width={600} height={300}>
    <MultiDropdownContainer />
  </TestBox>
))

const DropdownContainer = () => {
  const [val, setVal] = useState('')
  return (
    <React.Fragment>
      <DropdownInput
        value={val}
        onChange={setVal}
        disabled={boolean('Disabled', false)}
        placeholder="Enter your thing"
        options={[
          { label: text('Label', 'Yes'), value: 'yes' },
          { label: 'No', value: 'no' },
          { label: 'Maybe', value: 'maybe' },
        ]}
      />
      <p>{val}</p>
    </React.Fragment>
  )
}
stories.add('Dropdown', () => (
  <TestBox width={600} height={300}>
    <DropdownContainer />
  </TestBox>
))

const ButtonChoiceContainer = () => {
  const [val, setVal] = useState('')
  return (
    <React.Fragment>
      <ButtonChoiceInput
        value={val}
        onChange={setVal}
        disabled={boolean('Disabled', false)}
        options={[
          { label: text('Label', 'Yes'), value: 'yes' },
          { label: 'No', value: 'no' },
          { label: 'Maybe', value: 'maybe' },
        ]}
      />
      <p>{val}</p>
    </React.Fragment>
  )
}
stories.add('Button Choice', () => (
  <TestBox width={600} height={300}>
    <ButtonChoiceContainer />
  </TestBox>
))

const MultiCheckboxContainer = () => {
  const [val, setVal] = useState()
  return (
    <React.Fragment>
      <MultiCheckboxInput
        values={val}
        onChange={setVal}
        disabled={boolean('Disabled', false)}
        options={[
          { label: text('Label', 'Apple'), value: 'a' },
          { label: 'Banana', value: 'b' },
          { label: 'Coconut', value: 'c' },
        ]}
      />
      <p>{(val || []).join(', ')}</p>
    </React.Fragment>
  )
}
stories.add('Multi Checkbox', () => (
  <TestBox width={600} height={300}>
    <MultiCheckboxContainer />
  </TestBox>
))

const CheckboxContainer = () => {
  const [val, setVal] = useState(false)
  return (
    <React.Fragment>
      <CheckboxInput
        value={val}
        label="Check the box?"
        onChange={setVal}
        disabled={boolean('Disabled', false)}
      />
      <p>{val ? 'Checked' : 'Not checked'}</p>
    </React.Fragment>
  )
}
stories.add('Checkbox', () => (
  <TestBox width={600} height={300}>
    <CheckboxContainer />
  </TestBox>
))

const RadioContainer = () => {
  const [val, setVal] = useState('')
  return (
    <React.Fragment>
      <RadioInput
        value={val}
        onChange={setVal}
        disabled={boolean('Disabled', false)}
        options={[
          { label: text('Label', 'Apple'), value: 'a' },
          { label: 'Banana', value: 'b' },
          { label: 'Coconut', value: 'c' },
        ]}
      />
      <p>{val}</p>
    </React.Fragment>
  )
}
stories.add('Radio', () => (
  <TestBox width={600} height={300}>
    <RadioContainer />
  </TestBox>
))

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
