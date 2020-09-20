//@flow
// A form where the client tells us about their rental repairs issue.
import * as React from 'react'

import { FIELD_TYPES } from 'consts'
import type { Field } from 'types'

const INTRO: Field = {
  required: true,
  type: FIELD_TYPES.DISPLAY,
  Prompt: <span>Rental repairs</span>,
  Help: (
    <span>
      Thank you for your responses so far. We will now ask a few questions
      around your rental repairs.
    </span>
  ),
  buttonText: 'Continue',
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

const REPAIRS_REQUIRED: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_MULTI,
  choices: [
    { label: 'Water', value: 'Water' },
    { label: 'Roof', value: 'Roof' },
    { label: 'Heating or cooling', value: 'Heating or cooling' },
    { label: 'Toilet', value: 'Toilet' },
    { label: 'Cooking', value: 'Cooking' },
    { label: 'Electricity', value: 'Electricity' },
    { label: 'Fire', value: 'Fire' },
    { label: 'Gas', value: 'Gas' },
    { label: 'Laundry', value: 'Laundry' },
    { label: 'Other', value: 'Other' },
  ],
  Prompt: <span>What do your rental repairs relate to?</span>,
  Help: <span>Choose as many as you like</span>,
}

const ISSUE_DESCRIPTION: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: (
    <span>
      Please provide a short description of the problems at your rental
      property.
    </span>
  ),
}

const ISSUE_START: Field = {
  required: true,
  type: FIELD_TYPES.DATE,
  Prompt: <span>When did these problems arise?</span>,
  Help: (
    <span>
      If you don't know the exact date, that's okay. An approximate date is
      fine.
    </span>
  ),
}

const ISSUE_PHOTO: Field = {
  required: false,
  type: FIELD_TYPES.UPLOAD,
  Prompt: (
    <span>Do you have any photos of the problem(s) that you could upload?</span>
  ),
  Help: (
    <span>
      If you do not have any photos of the problem(s) to upload, that’s
      completely okay.
    </span>
  ),
}

const OUTRO: Field = {
  required: true,
  type: FIELD_TYPES.DISPLAY,
  Prompt: <span>Thanks. That is all the questions about rental repairs.</span>,
  buttonText: 'Continue',
}

export const FIELDS = {
  INTRO,
  START_DATE,
  IS_ON_LEASE,
  REPAIRS_REQUIRED,
  ISSUE_DESCRIPTION,
  ISSUE_START,
  ISSUE_PHOTO,
  OUTRO,
}