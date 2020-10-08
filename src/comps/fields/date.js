// @flow
import React, { useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { Button, Icon, DateInput, ErrorMessage, Form, theme } from 'design'
import type { FormFieldProps } from './types'

export const DateField = ({
  onNext,
  onSkip,
  field,
  value,
  isLoading,
  onChange,
  children,
}: FormFieldProps) => {
  // Determine whether the confirm button is active
  const [hasAttemptSubmit, setAttemptSubmit] = useState(false)
  const isDisabled = isLoading || !value
  const isDateTooOld = value
    ? getTimestamp(value) < getTimestamp('1900-1-1')
    : false
  const isDateInFuture = value
    ? getTimestamp(value) >= getTimestampNow()
    : false
  const isDateValid = !isDateTooOld && !isDateInFuture
  const shouldShowError = !isDateValid && hasAttemptSubmit
  const onSubmit = (e) => {
    if (isDateValid) {
      onNext(e)
    } else {
      e.preventDefault()
      setAttemptSubmit(true)
    }
  }
  return (
    <Form.Outer>
      <FormContent>
        {children}
        <DateInput
          value={value}
          disabled={isLoading}
          onChange={onChange}
          autoFocus={false}
        />
        {shouldShowError && isDateTooOld && (
          <ErrorWrapper>
            <ErrorMessage>
              Hold on, that date is over 100 years ago!
            </ErrorMessage>
          </ErrorWrapper>
        )}
        {shouldShowError && isDateInFuture && (
          <ErrorWrapper>
            <ErrorMessage>Hold on, that date is in the future!</ErrorMessage>
          </ErrorWrapper>
        )}
      </FormContent>
      <Form.Footer>
        <FooterForm invalid={shouldShowError} onSubmit={onSubmit}>
          <Button
            primary
            disabled={isDisabled}
            type="submit"
            Icon={field.button ? field.button.Icon : Icon.Tick}
          >
            {field.button ? field.button.text : 'OK'}
          </Button>
          {!field.required && <Button onClick={onSkip}>Skip</Button>}
        </FooterForm>
      </Form.Footer>
    </Form.Outer>
  )
}

const ErrorWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -40px;
`

const FormContent = styled(Form.Content)`
  position: relative;
`

const FooterForm = styled.form`
  ${theme.switch({ invalid: `opacity: 0; pointer-events: none;` })}
`

const getTimestampNow = (): number => moment().unix()
const getTimestamp = (s: string): number => moment(s, 'YYYY-MM-DD').unix()
