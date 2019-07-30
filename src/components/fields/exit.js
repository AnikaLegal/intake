// @flow
import React from 'react'
import { NamedRedirect } from 'routes'

import type { FieldProps } from './types'

export const ExitField = ({ field }: FieldProps) => (
  <NamedRedirect to={field.name} />
)
