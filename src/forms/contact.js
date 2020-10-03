//@flow
// A form where we get the client's contact details.
import * as React from 'react'

import { FIELD_TYPES } from 'consts'
import type { Field } from 'types'

const INTRO: Field = {
  required: true,
  type: FIELD_TYPES.DISPLAY,
  Prompt: (
    <span>
      Great job. That is all the questions we have about your property. Now we
      just need a few details about you.
    </span>
  ),
  Help: (
    <span>
      These details will help us to better understand who you are and when we
      can contact you.
    </span>
  ),
  buttonText: 'Continue',
}

const DOB: Field = {
  required: true,
  type: FIELD_TYPES.DATE,
  Prompt: <span>What is your date of birth?</span>,
}

const PHONE: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is the best phone number to contact you on?</span>,
}

const AVAILIBILITY: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    { label: 'Monday to Friday (9am to 5pm)', value: 'WEEK_DAY' },
    { label: 'Monday to Friday (5pm to 8pm)', value: 'WEEK_EVENING' },
    { label: 'Saturday (9am to 5pm)', value: 'SATURDAY' },
    { label: 'Sunday (9am to 5pm)', value: 'SUNDAY' },
  ],
  Prompt: <span>When is your preferred time for us to call you??</span>,
}

export const FIELDS = {
  INTRO,
  DOB,
  PHONE,
  AVAILIBILITY,
}
