//@flow
import * as React from 'react'

export type Data = { [string]: any }

export type FieldType =
  | 'TEXT'
  | 'NUMBER'
  | 'EMAIL'
  | 'DATE'
  | 'CHOICE_SINGLE'
  | 'CHOICE_MULTI'
  | 'FILE'
  | 'PHOTO'

export type Field = {
  type: FieldType,
  required: boolean,
  Prompt: React.Element<'span'>,
  Help?: React.Element<'span'>,
}
