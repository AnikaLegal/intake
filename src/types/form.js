//@flow
import * as React from 'react'

export type Data = { [string]: any }

export type FieldType =
  | 'TEXT'
  | 'EMAIL'
  | 'DATE'
  | 'CHOICE_SINGLE'
  | 'CHOICE_MULTI'
  | 'UPLOAD'
  | 'DISPLAY'

export type Field = {
  type: FieldType,
  required: boolean,
  Prompt: React.Element<'span'>,
  Help?: React.Element<'span'>,
  choices?: Array<{ label: string, value: string | boolean | null }>,
  button?: {
    text: string,
    Icon: any,
  },
}
