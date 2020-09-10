//@flow
// A form where we determine whether client is eligible.
import * as React from 'react'

import { FIELD_TYPES } from 'consts'
import type { Field } from 'types'

const IS_VICTORIAN: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ],
  Prompt: <span>Do you live in Victoria?</span>,
}

const IS_TENANT: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ],
  Prompt: <span>Do you rent the property that you are enquring about?</span>,
}

export const FIELDS = {
  IS_VICTORIAN,
  IS_TENANT,
}
