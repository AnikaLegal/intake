// @flow
import React from 'react'
import styled from 'styled-components'

import { Button, Icon, Form } from 'design'
import type { FormFieldProps } from './types'

export const DisplayField = ({
  onNext,
  field,
  onChange,
  children,
  isLoading,
}: FormFieldProps) => {
  return (
    <Form.Outer>
      <Form.Content>{children}</Form.Content>
      <Form.Footer>
        <form onSubmit={onNext}>
          <Button
            primary
            type="submit"
            disabled={isLoading}
            Icon={
              field.button
                ? field.button.showLoading && isLoading
                  ? Icon.LoadingSpinner
                  : field.button.Icon
                : Icon.Tick
            }
          >
            {field.button ? field.button.text : 'OK'}
          </Button>
        </form>
      </Form.Footer>
    </Form.Outer>
  )
}
