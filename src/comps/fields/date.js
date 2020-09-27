// @flow
import React from 'react'
import styled from 'styled-components'

import { Button, Icon, DateInput, ErrorMessage } from 'design'
import type { FormFieldProps } from './types'

export const DateField = ({
  onNext,
  onSkip,
  field,
  value,
  isLoading,
  onChange,
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
    <form onSubmit={onNext}>
      <DateInput value={value} disabled={isLoading} onChange={onChange} />
      {isDateTooOld && (
        <ErrorMessage>Hold on, that date is over 100 years ago!</ErrorMessage>
      )}
      {isDateInFuture && (
        <ErrorMessage>Hold on, that date is in the future!</ErrorMessage>
      )}
      <ButtonGroupEl>
        {isDateValid && (
          <Button
            primary
            disabled={isDisabled}
            type="submit"
            Icon={field.button ? field.button.Icon : Icon.Tick}
          >
            {field.button ? field.button.text : 'OK'}
          </Button>
        )}{' '}
        {!field.required && <Button onClick={onSkip}>Skip</Button>}
      </ButtonGroupEl>
    </form>
  )
}

const getTimestampNow = (): number => Date.now()
const getTimestamp = (s: string): number => Date.parse(s)

const ButtonGroupEl = styled.div`
  margin-top: 24px;
`
