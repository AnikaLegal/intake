//@flow
// A form where we determine what issues the client has.
import * as React from 'react'

import { FIELD_TYPES } from 'consts'
import type { Field } from 'types'

const ADDRESS: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your address?</span>,
}

const ISSUES: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_MULTI,
  choices: [
    { label: 'I need rental repairs', value: 'REPAIRS' },
    { label: 'I need a reduction in rent', value: 'RENT_REDUCTION' },
    { label: 'Some other rental issue', value: 'OTHER' },
  ],
  Prompt: <span>What do you need help with?</span>,
}

export const FIELDS = {
  ADDRESS,
  ISSUES,
}
