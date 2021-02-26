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
    stage: 2,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    effect: async (data: Data) => {
      events.onIssueDetailsComplete()
    },
    Prompt: (
      <span>Almost done! Now just a few questions about your landlord.</span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'PROPERTY_MANAGER_IS_AGENT',
    stage: 2,
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
  },
  {
    name: 'AGENT_NAME',
    stage: 2,
    askCondition: isManagerAgent,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your landlord's agent's full name?</span>,
  },
  {
    name: 'AGENT_ADDRESS',
    stage: 2,
    askCondition: isManagerAgent,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your landlord's agent's address?</span>,
  },
  {
    name: 'AGENT_EMAIL',
    stage: 2,
    askCondition: isManagerAgent,
    required: true,
    type: FIELD_TYPES.EMAIL,
    Prompt: <span>What is your landlord's agent's email?</span>,
  },
  {
    name: 'AGENT_PHONE',
    stage: 2,
    askCondition: isManagerAgent,
    required: true,
    type: FIELD_TYPES.PHONE,
    Prompt: <span>What is your landlord's agent's phone number?</span>,
  },
  {
    name: 'LANDLORD_NAME',
    stage: 2,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your landlord's full name?</span>,
  },
  {
    name: 'LANDLORD_ADDRESS',
    stage: 2,
    askCondition: isManagerLandlord,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your landlord's address?</span>,
  },
  {
    name: 'LANDLORD_EMAIL',
    stage: 2,
    askCondition: isManagerLandlord,
    required: true,
    type: FIELD_TYPES.EMAIL,
    Prompt: <span>What is your landlord's email?</span>,
  },
  {
    name: 'LANDLORD_PHONE',
    stage: 2,
    askCondition: isManagerLandlord,
    required: true,
    type: FIELD_TYPES.PHONE,
    Prompt: <span>What is your landlord's phone number?</span>,
  },
  {
    name: 'WEEKLY_RENT',
    stage: 2,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How much rent do you (and your partner) pay per week?</span>,
  },
]
