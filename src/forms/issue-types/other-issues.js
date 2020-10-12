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
  ['ISSUE_DESCRIPTION', ISSUE_DESCRIPTION],
  ['OUTRO', OUTRO],
]
