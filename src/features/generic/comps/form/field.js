// @flow
import * as React from 'react'
import styled from 'styled-components'

import { FieldErrors } from './errors'
import { FieldHeader, FieldLabel } from './header'

type Props = {
  prompt: string,
  required: boolean,
  errors: Array<string>,
  children: React.Node,
  help?: string,
}

export const Field = ({ prompt, required, errors, children, help }: Props) => (
  <FieldEl>
    <FieldHeader
      invalid={errors.length > 0}
      prompt={prompt}
      required={required}
      help={help}
    />
    <FieldChildren>{children}</FieldChildren>
    <FieldErrors errors={errors} />
  </FieldEl>
)

type GroupProps = {
  prompt: string,
  children: React.Node,
  help?: string,
}
type GroupFieldProps = {
  label: string,
  required: boolean,
  errors: Array<string>,
  children: React.Node,
}
export const FieldGroup = ({ prompt, children, help }: GroupProps) => (
  <FieldEl>
    <FieldHeader prompt={prompt} required={false} help={help} />
    <FieldChildren>{children}</FieldChildren>
  </FieldEl>
)
FieldGroup.Field = ({ children, errors, label, required }: GroupFieldProps) => (
  <React.Fragment>
    <FieldLabel label={label} required={required} invalid={errors.length > 0} />
    {children}
    <FieldErrors errors={errors} />
  </React.Fragment>
)

const FieldEl = styled.div`
  margin-bottom: 2.5rem;
  max-width: 800px;
`
const FieldChildren = styled.div`
  max-width: 500px;
`
