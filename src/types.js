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

export type Client = {
  uuid: string,
  firstName: string,
  lastName: string,
  email: string,
  isEligible: null | boolean,
  dob?: void,
  phone?: void,
  tenancy?: void,
  callTime?: void,
}
