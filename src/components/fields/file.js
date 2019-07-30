// @flow
import React from 'react'
import { UploadField } from 'containers'

import type { FieldProps } from './types'

export const FileField = ({ onChange }: FieldProps) => (
  <UploadField onChange={onChange} />
)
