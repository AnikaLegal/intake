// @flow
import React from 'react'
import styled from 'styled-components'

import { Button, Icon, TextInput, Form } from 'design'
import type { FormFieldProps } from './types'

export const PhoneField = ({
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
  return (
    <Form.Outer>
      <Form.Content>
        {children}
        <form onSubmit={onNext}>
          <TextInput
            placeholder="Type your answer here..."
            value={value}
            disabled={isLoading}
            onChange={onChange}
            autoFocus={false}
            type="tel"
          />
        </form>
      </Form.Content>
      <Form.Footer>
        <form onSubmit={onNext}>
          <Button
            primary
            disabled={isDisabled}
            type="submit"
            Icon={field.button ? field.button.Icon : Icon.Tick}
          >
            {field.button ? field.button.text : 'OK'}
          </Button>
          {!field.required && <Button onClick={onSkip}>Skip</Button>}
        </form>
      </Form.Footer>
    </Form.Outer>
  )
}
