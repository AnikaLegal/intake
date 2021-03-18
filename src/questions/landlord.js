//@flow
// All the questions in the questionnaire.
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import { api } from 'api'
import { storeFormData } from 'utils'
import type { Field, Data } from 'types'

const isManagerAgent = (data: Data) => data.PROPERTY_MANAGER_IS_AGENT
const isManagerLandlord = (data: Data) => !data.PROPERTY_MANAGER_IS_AGENT

export const LANDLORD_QUESTIONS: Array<Field> = [
  {
    name: 'PROPERTY_MANAGER_INTRO',
    stage: 3,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    effect: async (data: Data) => {
      events.onIssueDetailsComplete()
    },
    Prompt: (
      <span>Almost done! Now just a few questions about your landlord.</span>
    ),
    Help: (
      <span>
        We use this information to run a conflict check and to help us write
        letters for you. We will <strong>not</strong> contact your landlord
        without your permission.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'PROPERTY_MANAGER_IS_AGENT',
    stage: 3,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>
        Does your landlord use a <strong>real estate agent</strong> to manage
        the property?
      </span>
    ),
    Help: (
      <span>
        You can find this information on the first couple of pages of your
        lease.
      </span>
    ),
  },
  {
    name: 'AGENT_NAME',
    stage: 3,
    askCondition: isManagerAgent,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your landlord's agent's full name?</span>,
    Help: (
      <span>
        You can find this information on the first couple of pages of your
        lease.
      </span>
    ),
  },
  {
    name: 'AGENT_ADDRESS',
    stage: 3,
    askCondition: isManagerAgent,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your landlord's agent's address?</span>,
    Help: (
      <span>
        You can find this information on the first couple of pages of your
        lease.
      </span>
    ),
  },
  {
    name: 'AGENT_EMAIL',
    stage: 3,
    askCondition: isManagerAgent,
    required: true,
    type: FIELD_TYPES.EMAIL,
    Prompt: <span>What is your landlord's agent's email?</span>,

    Help: (
      <span>
        You can find this information on the first couple of pages of your
        lease.
      </span>
    ),
  },
  {
    name: 'AGENT_PHONE',
    stage: 3,
    askCondition: isManagerAgent,
    required: true,
    type: FIELD_TYPES.PHONE,
    Prompt: <span>What is your landlord's agent's phone number?</span>,
    Help: (
      <span>
        You can find this information on the first couple of pages of your
        lease.
      </span>
    ),
  },
  {
    name: 'LANDLORD_NAME',
    stage: 3,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your landlord's full name?</span>,
    Help: (
      <span>
        You can find this information on the first couple of pages of your
        lease.
      </span>
    ),
  },
  {
    name: 'LANDLORD_ADDRESS',
    stage: 3,
    askCondition: isManagerLandlord,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your landlord's address?</span>,
    Help: (
      <span>
        You can find this information on the first couple of pages of your
        lease.
      </span>
    ),
  },
  {
    name: 'LANDLORD_EMAIL',
    stage: 3,
    askCondition: isManagerLandlord,
    required: true,
    type: FIELD_TYPES.EMAIL,
    Prompt: <span>What is your landlord's email?</span>,
    Help: (
      <span>
        You can find this information on the first couple of pages of your
        lease.
      </span>
    ),
  },
  {
    name: 'LANDLORD_PHONE',
    stage: 3,
    askCondition: isManagerLandlord,
    required: true,
    type: FIELD_TYPES.PHONE,
    Prompt: <span>What is your landlord's phone number?</span>,
    Help: (
      <span>
        You can find this information on the first couple of pages of your
        lease.
      </span>
    ),
  },
]
