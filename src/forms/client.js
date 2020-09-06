//@flow
// A form where we create a new client.
import * as React from 'react'

import { FIELD_TYPES } from 'consts'
import type { Field } from 'types'

const FIRST_NAME: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: (
    <span>
      Let's start with your <strong>first name.</strong>
    </span>
  ),
}

const LAST_NAME: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: (
    <span>
      And your <strong>last name?</strong>
    </span>
  ),
}

const EMAIL: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: (
    <span>
      What <strong>email address</strong> can we reach you at?
    </span>
  ),
  Help: (
    <span>
      Our paralegals will use this address to contact you once you complete the
      questionnaire.
    </span>
  ),
}

export const FIELDS = {
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
}
