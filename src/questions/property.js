//@flow
// All the questions in the questionnaire.
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import type { Field, Data } from 'types'

export const PROPERTY_QUESTIONS: Array<Field> = [
  {
    name: 'PROPERTY_INTRO',
    stage: 3,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Your rental property</span>,
    Help: (
      <span>
        Thanks for your answers so far. We have a few questions about the home
        that you are renting.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'RENTAL_CIRCUMSTANCES',
    stage: 3,
    required: true,
    Prompt: <span>Who are you renting with?</span>,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Renting by myself', value: 'SOLO' },
      { label: 'Renting with flatmates', value: 'FLATMATES' },
      { label: 'Renting with partner', value: 'PARTNER' },
      { label: 'Renting with family / children', value: 'FAMILY' },
      { label: 'Other', value: 'OTHER' },
    ],
  },
  {
    name: 'IS_ON_LEASE',
    stage: 3,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    Prompt: <span>Are you named as a tenant on the lease?</span>,
    Help: (
      <span>
        If you signed the lease, it is likely that you are named as a tenant.
      </span>
    ),
    choices: [
      { label: 'Yes', value: 'YES' },
      { label: 'No', value: 'NO' },
      { label: 'I have a verbal lease agreement', value: 'VERBAL' },
    ],
  },
  {
    name: 'START_DATE',
    stage: 3,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: <span>When did you start living at this property?</span>,
    Help: <span>You can find this written on your lease</span>,
  },
  {
    name: 'SUBURB',
    stage: 3,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What suburb do you live in?</span>,
  },
  {
    name: 'POSTCODE',
    stage: 3,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>What is your postcode?</span>,
  },
  {
    name: 'ADDRESS',
    stage: 3,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your street address?</span>,
  },
  {
    name: 'WEEKLY_RENT',
    stage: 3,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How much is your weekly rent?</span>,
  },
]
