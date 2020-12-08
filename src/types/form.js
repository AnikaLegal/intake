//@flow
import * as React from 'react'
import type { Client, Data } from './core'

export type FieldType =
  | 'TEXT'
  | 'EMAIL'
  | 'DATE'
  | 'CHOICE_SINGLE'
  | 'CHOICE_MULTI'
  | 'UPLOAD'
  | 'DISPLAY'
  | 'PHONE'
  | 'NUMBER'

export type Field = {
  type: FieldType,
  stage: number,
  name: string,
  effect?: (data: Data) => Promise<string | void>,
  askCondition?: (data: Data) => boolean,
  required: boolean,
  Prompt: React.Element<'span'>,
  Help?: React.Element<'span'>,
  choices?: Array<{ label: string, value: string | boolean | null }>,
  button?: {
    text: string,
    Icon: any,
  },
}
