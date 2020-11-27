// @flow
import React from 'react'
import styled from 'styled-components'

import { Button, Icon, SelectInput, Form } from 'design'
import { timeout } from 'utils'
import type { FormFieldProps } from './types'

export const ChoiceSingleField = ({
  onNext,
  field,
  value,
  onChange,
  children,
}: FormFieldProps) => {
  const onClick = async (val) => {
    onChange(val)
    await timeout(400)
    onNext({ preventDefault: () => {} })
  }

  return (
    <Form.Outer>
      <Form.Content>
        {children}
        <SelectInput value={value} onChange={onClick} options={field.choices} />
      </Form.Content>
    </Form.Outer>
  )
}
