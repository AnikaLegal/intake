//@flow
// A form where we determine who is managing the property
import * as React from 'react'

import { FIELD_TYPES } from 'consts'
import type { Field } from 'types'

const INTRO: Field = {
  required: true,
  type: FIELD_TYPES.DISPLAY,
  Prompt: (
    <span>Almost done! Now just a few questions about your landlord.</span>
  ),
  buttonText: 'Continue',
}

const IS_AGENT: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ],
  Prompt: (
    <span>
      Does your landlord use a <strong>real estate agent</strong> to manage the
      property?
    </span>
  ),
}

export const FIELDS = {
  INTRO,
  IS_AGENT,
}
