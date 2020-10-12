//@flow
// A form where the client tells us about their rental repairs issue.
import * as React from 'react'

import { FIELD_TYPES } from 'consts'
import type { Field } from 'types'

const INTRO: Field = {
  required: true,
  type: FIELD_TYPES.DISPLAY,
  Prompt: <span>Rent reduction</span>,
  Help: (
    <span>
      Thank you for your responses so far. We will now ask you some questions
      about your rental situation.
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

const COVID_ISSUES: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_MULTI,
  choices: [
    { label: 'Reduced income', value: 'Reduced income' },
    { label: 'Unable to work', value: 'Unable to work' },
    { label: 'Emotional distress', value: 'Emotional distress' },
    {
      label: 'Another tenant has moved out',
      value: 'Another tenant has moved out',
    },
    { label: 'Other', value: 'Other' },
  ],
  Prompt: <span>How have you been affected by COVID-19?</span>,
  Help: <span>Choose as many as you like</span>,
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
    <span>
      Please upload a photo of any evidence of how you have been affected.
    </span>
  ),
  Help: (
    <span>
      For example, if you have lost your job and have received a letter of
      termination, please upload the a photo letter of termination. Providing
      evidence will increase your chance of obtaining a rent reduction but if
      you don't have any right now that is ok.
    </span>
  ),
}

const IS_JOB_SEEKER_BENEFITS: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
    { label: 'Not sure', value: null },
  ],
  Prompt: <span>Will you be receiving Job Keeper or Job Seeker benefits?</span>,
}

// TODO: make NOTICE_TO_VACATE_DOCUMENT conditional on this field.
const IS_NOTICE_TO_VACATE: Field = {
  required: true,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ],
  Prompt: (
    <span>
      Has the landlord tried to evict you by providing you with a Notice to
      Vacate?
    </span>
  ),
}

const NOTICE_TO_VACATE_DOCUMENT: Field = {
  required: false,
  type: FIELD_TYPES.UPLOAD,
  Prompt: <span>Please upload a photo of your Notice to Vacate.</span>,
}

const OUTRO: Field = {
  required: true,
  type: FIELD_TYPES.DISPLAY,
  Prompt: (
    <span>
      Thank you. That is all the questions about COVID-19 rental assistance.
    </span>
  ),
  button: { text: 'Continue', Icon: null },
}

export const FIELDS = [
  ['INTRO', INTRO],
  ['START_DATE', START_DATE],
  ['IS_ON_LEASE', IS_ON_LEASE],
  ['COVID_ISSUES', COVID_ISSUES],
  ['ISSUE_DESCRIPTION', ISSUE_DESCRIPTION],
  ['ISSUE_START', ISSUE_START],
  ['ISSUE_PHOTO', ISSUE_PHOTO],
  ['IS_JOB_SEEKER_BENEFITS', IS_JOB_SEEKER_BENEFITS],
  ['IS_NOTICE_TO_VACATE', IS_NOTICE_TO_VACATE],
  ['NOTICE_TO_VACATE_DOCUMENT', NOTICE_TO_VACATE_DOCUMENT],
  ['OUTRO', OUTRO],
]
