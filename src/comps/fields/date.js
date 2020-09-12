// @flow
import React from 'react'
import styled from 'styled-components'

import { Button, Icon, DateInput } from 'design'
import type { FormFieldProps } from './types'

export const DateField = ({
  onNext,
  onSkip,
  field,
  value,
  isLoading,
  onChange,
}: FormFieldProps) => {
  // Determine whether the confirm button is active
  const isDisabled = isLoading || !value
  return (
    <form onSubmit={onNext}>
      <DateInput value={value} disabled={isLoading} onChange={onChange} />
      <ButtonGroupEl>
        <Button
          primary
          disabled={isDisabled}
          type="submit"
          Icon={field.button ? field.button.Icon : Icon.Tick}
        >
          {field.button ? field.button.text : 'OK'}
        </Button>
        {!field.required && <Button onClick={onSkip}>Skip</Button>}
      </ButtonGroupEl>
    </form>
  )
}

const ButtonGroupEl = styled.div`
  margin-top: 24px;
`
