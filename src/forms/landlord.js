//@flow
// A form where we get the tenant's landlord info.
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
      Does your landlord use a real estate agent to manage the property?
    </span>
  ),
}

const LANDLORD_NAME: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your landlord's full name?</span>,
}

const LANDLORD_ADDRESS: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your landlord's address?</span>,
}

const LANDLORD_EMAIL: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your landlord's email?</span>,
}
const LANDLORD_PHONE: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your landlord's phone number?</span>,
}

const AGENT_NAME: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your landlord's agent's full name?</span>,
}

const AGENT_ADDRESS: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your landlord's agent's address?</span>,
}

const AGENT_EMAIL: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your landlord's agent's email?</span>,
}
const AGENT_PHONE: Field = {
  required: true,
  type: FIELD_TYPES.TEXT,
  Prompt: <span>What is your landlord's agent's phone number?</span>,
}

export const FIELDS = {
  INTRO,
  IS_AGENT,
  LANDLORD_NAME,
  LANDLORD_ADDRESS,
  LANDLORD_EMAIL,
  LANDLORD_PHONE,
  // TODO: Make this conditional, ask Mason what he wants.
  AGENT_NAME,
  AGENT_ADDRESS,
  AGENT_EMAIL,
  AGENT_PHONE,
}
