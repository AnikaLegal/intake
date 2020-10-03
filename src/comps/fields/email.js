// @flow
import React from 'react'
import styled from 'styled-components'

import { Button, Icon, TextInput, ErrorMessage, Form, theme } from 'design'
import type { FormFieldProps } from './types'

// TODO: email validation.
export const EmailField = ({
  onNext,
  onSkip,
  field,
  value,
  isLoading,
  onChange,
  children,
}: FormFieldProps) => {
  // Determine whether the confirm button is active
  const isEmailValid = checkIsEmailValid(value)
  const isSubmitDisabled = isLoading || !value || !isEmailValid
  return (
    <Form.Outer>
      <FormContent>
        {children}

        <form onSubmit={onNext}>
          <TextInput
            placeholder="Type your answer here..."
            value={value}
            disabled={isLoading}
            onChange={onChange}
          />
          {!isEmailValid && (
            <ErrorWrapper>
              <ErrorMessage>
                Hold on, that email doesn't look valid
              </ErrorMessage>
            </ErrorWrapper>
          )}
        </form>
      </FormContent>
      <Form.Footer>
        <FooterForm invalid={!isEmailValid} onSubmit={onNext}>
          <Button
            primary
            disabled={isSubmitDisabled}
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

const FooterForm = styled.form`
  ${theme.switch({ invalid: `opacity: 0; pointer-events: none;` })}
`

const FormContent = styled(Form.Content)`
  position: relative;
`

// Grabbed a regex off the internet.
// https://html.form.guide/best-practices/validate-email-address-using-javascript/
const EMAIL_REGEX = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

const checkIsEmailValid = (email: string): boolean => {
  if (!email) return true
  return EMAIL_REGEX.test(email)
}
