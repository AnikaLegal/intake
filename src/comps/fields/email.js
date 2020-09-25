// @flow
import React from 'react'
import styled from 'styled-components'

import { Button, Icon, TextInput, ErrorMessage } from 'design'
import type { FormFieldProps } from './types'

// TODO: email validation.
export const EmailField = ({
  onNext,
  onSkip,
  field,
  value,
  isLoading,
  onChange,
}: FormFieldProps) => {
  // Determine whether the confirm button is active
  const isDisabled = isLoading || !value
  const isEmailValid = checkIsEmailValid(value)
  return (
    <form onSubmit={onNext}>
      <TextInput
        placeholder="Type your answer here..."
        value={value}
        disabled={isLoading}
        onChange={onChange}
      />
      {!isEmailValid && (
        <ErrorMessage>Hold on, that email doesn't look valid</ErrorMessage>
      )}
      <ButtonGroupEl>
        {isEmailValid && (
          <Button
            primary
            disabled={isDisabled}
            type="submit"
            Icon={field.button ? field.button.Icon : Icon.Tick}
          >
            {field.button ? field.button.text : 'OK'}
          </Button>
        )}
        {!field.required && <Button onClick={onSkip}>Skip</Button>}
      </ButtonGroupEl>
    </form>
  )
}

const ButtonGroupEl = styled.div`
  margin-top: 24px;
`

// Grabbed a regex off the internet.
// https://html.form.guide/best-practices/validate-email-address-using-javascript/
const EMAIL_REGEX = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

const checkIsEmailValid = (email: string): boolean => {
  if (!email) return true
  return EMAIL_REGEX.test(email)
}
