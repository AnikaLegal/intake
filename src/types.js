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

export type Person = {
  id: number,
  fullName: string,
  address: string,
  email: string,
  phone: string,
}

export type Tenancy = {
  id: number,
  address: string,
  isClientOnLease?: boolean,
  started?: string,
  landlord?: Person,
  agent?: Person,
}

export type Upload = {
  id: string,
  description: string | null,
  file: string,
}

export type Topic = 'REPAIRS' | 'COVID' | 'OTHER'

export type Submission = {
  id: string,
  answers: { [string]: any } | null,
  topic: Topic,
  complete: boolean,
  topic: Topic,
  uploads: Array<Upload>,
}

export type Client = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  isEligible: null | boolean,
  submissions: Array<Submission>,
  dob?: string,
  phone?: string,
  tenancy?: Tenancy,
  callTime?: string,
}
