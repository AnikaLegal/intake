// @flow
import React, { useState, useEffect } from 'react'

import { TextContainer, Text } from 'design'
import { FIELDS } from 'forms/client'
import { FORM_FIELDS } from './fields'
import type { Field, Upload } from 'types'

type Props = {
  fields: { [string]: Field },
  isViewLoading: boolean,
  initData: Object,
  onSubmit: (data: any) => Promise<void>,
  onUpload?: (File) => Promise<Upload>,
}

// TODO: function to check whether to skip questions
// TODO: add onupdate hook
export const Form = ({
  fields,
  onSubmit,
  onUpload,
  isViewLoading,
  initData,
}: Props) => {
  const fieldNames = Object.keys(fields)
  const [fieldIdx, setFieldIdx] = useState(0)
  const fieldName = fieldNames[fieldIdx]
  const field = fields[fieldName]
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(isViewLoading)
  const [isSubmit, setIsSubmit] = useState(false)
  useEffect(() => {
    setIsLoading(isViewLoading)
    if (!isViewLoading) {
      setData((d) => ({ ...d, ...initData }))
    }
  }, [isViewLoading])
  useEffect(() => {
    if (isSubmit) {
      // User has finished the form.
      setIsLoading(true)
      onSubmit(data)
    }
  }, [isSubmit])
  const navNext = () => {
    // Progress to the next question.
    setFieldIdx((i) => i + 1)
  }
  const onNext = (e) => {
    e.preventDefault() // Don't submit form.
    // User submits the current question.
    if (fieldIdx >= fieldNames.length - 1) {
      setIsSubmit(true)
    } else {
      navNext()
    }
  }
  const onSkip = () => {
    // User skips the current question.
    if (fieldIdx >= fieldNames.length - 1) {
      // User has finished the form.
      onSubmit(data)
    } else {
      navNext()
    }
  }
  const onChange = (v) => {
    // User enters some data.
    setData((d) => ({ ...d, [fieldName]: v }))
  }
  const FormField = field ? FORM_FIELDS[field.type] : null
  const value = data[fieldName]
  return (
    <TextContainer>
      <Text.Header>{field && field.Prompt}</Text.Header>
      {field && field.Help && <Text.Body>{field && field.Help}</Text.Body>}
      {FormField && (
        <FormField
          onNext={onNext}
          onSkip={onSkip}
          field={field}
          value={value}
          isLoading={isLoading}
          onChange={onChange}
          onUpload={onUpload}
        />
      )}
    </TextContainer>
  )
}
