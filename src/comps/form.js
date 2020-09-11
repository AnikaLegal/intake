// @flow
import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { IntakeNavbar } from 'comps'
import { TextContainer, Text, Button, theme, Icon, TextInput } from 'design'
import { FIELDS } from 'forms/client'
import { FIELD_TYPES } from 'consts'
import type { Field } from 'types'

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
  const FieldInput = FORM_INPUTS[field.type]
  const value = data[fieldName]

  // Determine whether the confirm button is active
  const isDisabled =
    isLoading || (!value && !(field.type === FIELD_TYPES.DISPLAY))
  return (
    <TextContainer>
      <Text.Header>{field.Prompt}</Text.Header>
      {field.Help && <Text.Body>{field.Help}</Text.Body>}
      <form onSubmit={onNext}>
        {FieldInput && (
          <FieldInput
            field={field}
            value={value}
            disabled={isLoading}
            onChange={onChange}
          />
        )}
        <ButtonGroupEl>
          <Button
            primary
            disabled={isDisabled}
            type="submit"
            Icon={field.button ? field.button.Icon : Icon.Tick}
          >
            {field.button ? field.button.text : 'OK'}
          </Button>
          {!field.required && <Button onClick={onSkip}>Skip</Button>}
        </ButtonGroupEl>
      </form>
    </TextContainer>
  )
}

const ButtonGroupEl = styled.div`
  margin-top: 24px;
`

const TextField = ({ field, ...props }) => {
  return <TextInput {...props} placeholder="Type your answer here..." />
}

const FORM_INPUTS = {
  [FIELD_TYPES.TEXT]: TextField,
  [FIELD_TYPES.EMAIL]: () => null,
  [FIELD_TYPES.DISPLAY]: () => null,
  [FIELD_TYPES.NUMBER]: () => null,
  [FIELD_TYPES.DATE]: () => null,
  [FIELD_TYPES.CHOICE_SINGLE]: () => null,
  [FIELD_TYPES.CHOICE_MULTI]: () => null,
  [FIELD_TYPES.FILE]: () => null,
  [FIELD_TYPES.PHOTO]: () => null,
}
