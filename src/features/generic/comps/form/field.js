// @flow
import * as React from 'react'
import styled from 'styled-components'

type Props = {
  prompt: string,
  required: boolean,
  errors: Array<string>,
  children: React.Node,
  help?: string,
}

// FIXME: ADD REQUIRED
// FIXME: ADD ERRORS
export const Field = ({ prompt, required, errors, children, help }: Props) => (
  <FieldEl>
    <h2>{prompt}</h2>
    {help && <HelpEl>{help}</HelpEl>}
    {children}
    {errors.map(e => (
      <ErrorEl key={e}>{e}</ErrorEl>
    ))}
  </FieldEl>
)

const FieldEl = styled.div`
  margin-bottom: 2.5rem;
`
const HelpEl = styled.p`
  margin: -0.2rem 0 1rem 0;
  font-weight: 300;
`
const ErrorEl = styled.p`
  font-weight: 300;
  color: #f5222d;
  margin: 0.5rem 0 1rem 0;
`
