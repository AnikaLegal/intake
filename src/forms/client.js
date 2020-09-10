//@flow
// A form where we create a new client.
import * as React from 'react'

import { FIELD_TYPES } from 'consts'
import type { Field } from 'types'

const INTRO: Field = {
  required: true,
  type: FIELD_TYPES.DISPLAY,
  Prompt: (
    <span>
      First of all, congratulations on taking the first step in solving your
      rental issues.
    </span>
  ),
  buttonText: 'Thank you',
}

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
  INTRO,
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
}
