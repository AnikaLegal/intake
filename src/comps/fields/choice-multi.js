// @flow
import React from 'react'
import styled from 'styled-components'

import { Button, Icon, MultiSelectInput, Form } from 'design'
import { timeout } from 'utils'
import type { FormFieldProps } from './types'

export const ChoiceMultiField = ({
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
          <MultiSelectInput
            values={value}
            disabled={isLoading}
            onChange={onChange}
            options={field.choices}
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
