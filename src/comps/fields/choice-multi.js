// @flow
import React from 'react'
import styled from 'styled-components'

import { Button, Icon, MultiSelectInput } from 'design'
import { timeout } from 'utils'
import type { FormFieldProps } from './types'

export const ChoiceMultiField = ({
  onNext,
  field,
  value,
  isLoading,
  onChange,
}: FormFieldProps) => {
  const onClick = async (val) => {
    onChange(val)
    await timeout(400)
    onNext({ preventDefault: () => {} })
  }

  return (
    <MultiSelectInput
      value={value}
      onChange={onClick}
      options={field.choices}
    />
  )
}
