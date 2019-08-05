// @flow
import * as React from 'react'
import styled from 'styled-components'

type Props = {
  errors: Array<string>,
}

export const FieldErrors = ({ errors }: Props) => (
  <React.Fragment>
    {errors.map(e => (
      <ErrorEl key={e}>{e}</ErrorEl>
    ))}
  </React.Fragment>
)

const ErrorEl = styled.p`
  font-weight: 300;
  color: #f5222d;
  margin: 0;
`
