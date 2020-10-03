// @flow
import React, { useState, useEffect } from 'react'
import { useRouteMatch, useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { FadeFooter, Text, theme } from 'design'
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
  const history = useHistory()
  let { url } = useRouteMatch()

  const { qIdx } = useParams()
  const fieldNames = Object.keys(fields)
  const fieldName = fieldNames[qIdx]
  const field = fields[fieldName]
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(isViewLoading)
  const [isSubmit, setIsSubmit] = useState(false)
  const isFinalQuestion = qIdx >= fieldNames.length - 1
  // Load default data
  useEffect(() => {
    setIsLoading(isViewLoading)
    if (!isViewLoading) {
      setData((d) => ({ ...d, ...initData }))
    }
  }, [isViewLoading])
  // Submit data
  useEffect(() => {
    if (isSubmit) {
      // User has finished the form.
      setIsLoading(true)
      onSubmit(data)
    }
  }, [isSubmit])
  // Progress form to next question
  const onNext = (e) => {
    e?.preventDefault() // Don't submit HTML form.
    // User submits the current question.
    if (isFinalQuestion) {
      // Trigger submission effect.
      setIsSubmit(true)
    } else {
      // Progress to the next question.
      const nextIdx = Number(qIdx) + 1
      const regex = /question\/\d+/
      const nextUrl =
        url.replace(regex, `question/${nextIdx}`) + window.location.search
      history.push(nextUrl)
    }
  }
  // User enters some data.
  const onChange = (v) => {
    setData((d) => ({ ...d, [fieldName]: v }))
  }
  const FormField = field ? FORM_FIELDS[field.type] : null
  const value = data[fieldName]
  console.log('Form data', data, url)
  if (!FormField) return null
  return (
    <>
      <FormField
        onNext={onNext}
        onSkip={onNext}
        field={field}
        value={value}
        isLoading={isLoading}
        onChange={onChange}
        onUpload={onUpload}
      >
        <Text.Header>{field && field.Prompt}</Text.Header>
        {field && field.Help && <Text.Body>{field && field.Help}</Text.Body>}
      </FormField>
      <FadeFooter />
    </>
  )
}
