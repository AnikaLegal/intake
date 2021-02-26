//@flow
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import type { Field, Data } from 'types'

export const ABOUT_QUESTIONS: Array<Field> = [
  // Stage 0 - client info.
  {
    name: 'INTRO',
    stage: 0,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: (
      <span>
        First of all, congratulations on taking the first step in solving your
        rental issues.
      </span>
    ),
    button: { text: 'Thank you', Icon: null },
  },
  {
    name: 'FIRST_NAME',
    stage: 0,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        Let's start with your <strong>first name.</strong>
      </span>
    ),
    effect: async (data: Data) => {
      events.onFirstSave()
    },
  },
  {
    name: 'LAST_NAME',
    stage: 0,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        And your <strong>last name?</strong>
      </span>
    ),
  },
  {
    name: 'EMAIL',
    stage: 0,
    required: true,
    type: FIELD_TYPES.EMAIL,
    Prompt: (
      <span>
        What <strong>email address</strong> can we reach you at?
      </span>
    ),
    Help: (
      <span>
        Our paralegals will use this address to contact you once you complete
        the questionnaire.
      </span>
    ),
    effect: async (data: Data) => {
      events.onBasicDetailsComplete()
    },
  },

  // Stage 0 - eligibility
  {
    name: 'IS_VICTORIAN',
    stage: 0,
    effect: async (data: Data) => {
      if (!data.IS_VICTORIAN) {
        return ROUTES.INELIGIBLE
      }
    },

    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Do you live in Victoria?</span>,
  },
  {
    name: 'IS_TENANT',
    stage: 0,
    effect: async (data: Data) => {
      events.onEligibilityComplete()
      if (!data.IS_TENANT) {
        return ROUTES.INELIGIBLE
      }
    },
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Do you rent the property that you are enquiring about?</span>,
  },
]
