// @flow
import React from 'react'
import styled from 'styled-components'

import { Button, Icon, SelectInput } from 'design'
import { timeout } from 'utils'
import type { FormFieldProps } from './types'

export const ChoiceSingleField = ({
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
    <SelectInput value={value} onChange={onClick} options={field.choices} />
  )
}
