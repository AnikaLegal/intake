//@flow
// A form where the client tells us about their other rental issues.
import * as React from 'react'

import { FIELD_TYPES } from 'consts'
import type { Field } from 'types'

const INTRO: Field = {
  required: true,
  type: FIELD_TYPES.DISPLAY,
  Prompt: <span>Other rental issues.</span>,
  Help: (
    <span>
      We will now ask you a few questions around your other issues with your
      rental property.
    </span>
  ),
  button: { text: 'Continue', Icon: null },
}

const START_DATE: Field = {
  required: true,
  type: FIELD_TYPES.DATE,
  Prompt: <span>When did you start living at this property?</span>,
}

const IS_ON_LEASE: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ],
  Prompt: <span>Are you named as a tenant on the lease?</span>,
  Help: (
    <span>
      If you signed the lease, it is likely that you are named as a tenant.
    </span>
  ),
}

const ISSUE_DESCRIPTION: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: (
    <span>
      Please provide a short description of how you have been affected.
    </span>
  ),
}

const OUTRO: Field = {
  required: true,
  type: FIELD_TYPES.DISPLAY,
  Prompt: (
    <span>
      Thank you. That is all the questions about other issues with your rental
      property.
    </span>
  ),
  button: { text: 'Continue', Icon: null },
}

export const FIELDS = [
  ['INTRO', INTRO],
  ['START_DATE', START_DATE],
  ['IS_ON_LEASE', IS_ON_LEASE],
  ['ISSUE_DESCRIPTION', ISSUE_DESCRIPTION],
  ['OUTRO', OUTRO],
]
