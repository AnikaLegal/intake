// @flow
import React from 'react'
import styled from 'styled-components'

import { Button, ButtonEl } from './button'

type Option = { label: string, value: any }

type Props = {
  value: any,
  disabled: boolean,
  onChange: any => void,
  options: Array<Option>,
}

export const ButtonChoiceInput = ({
  value,
  disabled,
  onChange,
  options,
}: Props) => {
  return (
    <ButtonChoiceEl>
      {options.map(option => (
        <Button
          secondary={value !== option.value}
          onClick={() => onChange(option.value)}
          disabled={disabled}
        >
          {option.label}
        </Button>
      ))}
    </ButtonChoiceEl>
  )
}

const ButtonChoiceEl = styled.div`
  ${ButtonEl} {
    border-radius: 0;
    border-left: 0;
    &:first-child {
      border-radius: 3px 0 0 3px;
      border-left: 1px solid #297485;
    }
    &:last-child {
      border-radius: 0 3px 3px 0;
    }
  }
`
