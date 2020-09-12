// @flow
// https://github.com/storybooks/storybook/tree/master/addons/knobs
import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, number } from '@storybook/addon-knobs'
import {
  BigButton,
  Button,
  Icon,
  TextInput,
  NumberInput,
  SelectInput,
  MultiSelectInput,
  DateInput,
  UploadInput,
} from '../design'

export const stories = storiesOf('Inputs', module)

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

stories.add('Date Input', () => {
  const [val, setVal] = useState('')
  return (
    <DateInput
      value={val}
      onChange={setVal}
      placeholder="Type your answer here"
    />
  )
})

stories.add('Number Input', () => {
  const [val, setVal] = useState('')
  return (
    <NumberInput
      value={val}
      onChange={setVal}
      placeholder="Type your answer here"
    />
  )
})

stories.add('Text Input', () => {
  const [val, setVal] = useState('')
  return (
    <TextInput
      value={val}
      onChange={setVal}
      placeholder="Type your answer here"
    />
  )
})

stories.add('Single Select Input', () => {
  const [val, setVal] = useState('')
  return (
    <>
      <SelectInput
        value={val}
        onChange={setVal}
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
          { label: 'Maybe', value: 'maybe' },
        ]}
      />
      <p>{val}</p>
    </>
  )
})

stories.add('Multi Select Input', () => {
  const [val, setVal] = useState([])
  return (
    <>
      <MultiSelectInput
        values={val}
        onChange={setVal}
        options={[
          { label: 'Red', value: 'Red' },
          { label: 'Blue', value: 'Blue' },
          { label: 'Green', value: 'Green' },
          { label: 'Yellow', value: 'Yellow' },
        ]}
      />
      <p>{(val || []).join(', ')}</p>
    </>
  )
})

stories.add('Upload Input', () => {
  const [val, setVal] = useState([])
  return (
    <React.Fragment>
      <UploadInput onUpload={onUpload} values={val} onChange={setVal} />
    </React.Fragment>
  )
})
const onUpload = (file: File): Promise<any> => {
  return new Promise((r) => {
    const reader = new FileReader()
    reader.addEventListener(
      'load',
      () => {
        r({
          id: file.name,
          file: String(reader.result),
        })
      },
      false
    )
    reader.readAsDataURL(file)
  })
}
