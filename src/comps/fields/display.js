// @flow
import React from 'react'
import styled from 'styled-components'

import { Button, Icon } from 'design'
import type { FormFieldProps } from './types'

export const DisplayField = ({
  onNext,
  field,
  isLoading,
  onChange,
}: FormFieldProps) => {
  return (
    <form onSubmit={onNext}>
      <Button
        primary
        type="submit"
        disabled={isLoading}
        Icon={field.button ? field.button.Icon : Icon.Tick}
      >
        {field.button ? field.button.text : 'OK'}
      </Button>
    </form>
  )
}
