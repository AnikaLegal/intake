// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  prompt: string,
  required: boolean,
  invalid?: boolean,
  help?: string,
}

export const FieldHeader = ({ prompt, invalid, required, help }: Props) => (
  <React.Fragment>
    <HeaderEl invalid={invalid}>
      {prompt}
      {required && <RequiredEl> *</RequiredEl>}
    </HeaderEl>
    {help && <HelpEl>{help}</HelpEl>}
  </React.Fragment>
)

type GroupFieldProps = {
  label: string,
  required: boolean,
  invalid?: boolean,
}
export const FieldLabel = ({ label, required, invalid }: GroupFieldProps) => (
  <GroupFieldEl invalid={invalid}>
    {label}
    {required && <RequiredEl> *</RequiredEl>}
  </GroupFieldEl>
)

const HeaderEl = styled.h4`
  margin: 0;
  ${({ invalid }) =>
    invalid &&
    css`
      color: #f5222d;
    `}
`
const HelpEl = styled.p`
  margin: 0 0 0.8rem 0;
  font-weight: 300;
`
const RequiredEl = styled.span`
  color: rgba(255, 0, 0, 0.6);
  font-weight: 400;
`
const GroupFieldEl = styled.p`
  font-weight: 500;
  margin-bottom: 0.2rem;
  ${({ invalid }) =>
    invalid &&
    css`
      color: #f5222d;
    `}
`
