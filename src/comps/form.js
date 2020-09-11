// @flow
import React, { useState } from 'react'

import { TextContainer, Text } from 'design'
import { FIELDS } from 'forms/client'
import type { Field } from 'types'

import { FORM_FIELDS } from './fields'

type Props = {
  fields: { [string]: Field },
  onSubmit: (data: any) => Promise<void>,
}

// TODO: function to check whether to skip questions
// TODO: add onupdate hook
export const Form = ({ fields, onSubmit }: Props) => {
  const fieldNames = Object.keys(fields)
  const [fieldIdx, setFieldIdx] = useState(0)
  const fieldName = fieldNames[fieldIdx]
  const field = fields[fieldName]
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const onNext = (e) => {
    e.preventDefault() // Don't submit form.
    // User submits the current question.
    if (fieldIdx >= fieldNames.length - 1) {
      // User has finished the form.
      setIsLoading(true)
      onSubmit(data)
    } else {
      // Progress to the next question.
      setFieldIdx((i) => i + 1)
    }
  }
  const onSkip = () => {
    // User skips the current question.
    if (fieldIdx >= fieldNames.length - 1) {
      // User has finished the form.
      onSubmit(data)
    } else {
      // Progress to the next question.
      setFieldIdx((i) => i + 1)
    }
  }
  const onChange = (v) => {
    // User enters some data.
    setData((d) => ({ ...d, [fieldName]: v }))
  }
  const FormField = FORM_FIELDS[field.type]
  const value = data[fieldName]
  return (
    <TextContainer>
      <Text.Header>{field.Prompt}</Text.Header>
      {field.Help && <Text.Body>{field.Help}</Text.Body>}
      <FormField
        onNext={onNext}
        onSkip={onSkip}
        field={field}
        value={value}
        isLoading={isLoading}
        onChange={onChange}
      />
    </TextContainer>
  )
}
