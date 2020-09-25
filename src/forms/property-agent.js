//@flow
// A form where we get the tenant's property manager's info.
import * as React from 'react'

import { FIELD_TYPES } from 'consts'
import type { Field } from 'types'

const NAME: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your landlord's agent's full name?</span>,
}

const ADDRESS: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your landlord's agent's address?</span>,
}

const EMAIL: Field = {
  required: true,
  type: FIELD_TYPES.EMAIL,
  Prompt: <span>What is your landlord's agent's email?</span>,
}
const PHONE: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your landlord's agent's phone number?</span>,
}

export const FIELDS = {
  NAME,
  ADDRESS,
  EMAIL,
  PHONE,
}
