// @flow
import React from 'react'
import styled from 'styled-components'

import { Button, Icon, UploadInput } from 'design'
import { timeout } from 'utils'
import type { FormFieldProps } from './types'

export const UploadField = ({
  onNext,
  onSkip,
  field,
  value,
  isLoading,
  onChange,
  onUpload,
}: FormFieldProps) => {
  // Determine whether the confirm button is active
  const isDisabled = isLoading || !value
  if (!onUpload) {
    throw Error('onUpload required for UploadField')
  }
  return (
    <form onSubmit={onNext}>
      <UploadInput onUpload={onUpload} values={value} onChange={onChange} />
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
