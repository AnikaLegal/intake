// @flow
import React, { useState } from 'react'
import styled from 'styled-components'

import {
  Button,
  Icon,
  SelectInput,
  ButtonOptions,
  TextInputOptions,
  Form,
} from 'design'
import { timeout } from 'utils'
import type { FormFieldProps } from './types'

export const ChoiceSingleTextField = ({
  onNext,
  field,
  value,
  onChange,
  children,
}: FormFieldProps) => {
  const onClick = async (val) => {
    onChange(val)
    await timeout(200)
    onNext({ preventDefault: () => {} })
  }
  // Determine whether the confirm button is active
  const [hasAttemptSubmit, setAttemptSubmit] = useState(false)
  const isSubmitDisabled = !value
  const onSubmit = (e) => {
    e.preventDefault()
    setAttemptSubmit(true)
  }

  return (
    <Form.Outer>
      <Form.Content>
        {children}
        <SelectInput value={value} onChange={onClick} options={field.choices} />
        {field.name === 'GENDER' && (
          <TextInputOptions
            placeholder={field.placeholderText}
            value={value}
            onChange={onChange}
            autoFocus={false}
          />
        )}
        {field.name === 'GENDER' && (
          <ButtonOptions
            primary
            disabled={isSubmitDisabled}
            type="submit"
            Icon={field.button ? field.button.Icon : Icon.Tick}
          >
            {field.button ? field.button.text : 'OK'}
          </ButtonOptions>
        )}
      </Form.Content>
    </Form.Outer>
  )
}
