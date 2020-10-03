// @flow
import React from 'react'
import styled from 'styled-components'

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
  const isDisabled = isLoading || !value
  const isDateTooOld = value
    ? getTimestamp(value) < getTimestamp('1900-1-1')
    : false
  const isDateInFuture = value
    ? getTimestamp(value) >= getTimestampNow()
    : false
  const isDateValid = !isDateTooOld && !isDateInFuture
  return (
    <Form.Outer>
      <FormContent>
        {children}
        <DateInput value={value} disabled={isLoading} onChange={onChange} />
        {isDateTooOld && (
          <ErrorWrapper>
            <ErrorMessage>
              Hold on, that date is over 100 years ago!
            </ErrorMessage>
          </ErrorWrapper>
        )}
        {isDateInFuture && (
          <ErrorWrapper>
            <ErrorMessage>Hold on, that date is in the future!</ErrorMessage>
          </ErrorWrapper>
        )}
      </FormContent>
      <Form.Footer>
        <FooterForm invalid={!isDateValid} onSubmit={onNext}>
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

const getTimestampNow = (): number => Date.now()
const getTimestamp = (s: string): number => Date.parse(s)
