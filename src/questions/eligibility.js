import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import { api } from 'api'
import { storeFormData } from 'utils'
import type { Field, Data } from 'types'

export const ELIGIBILITY_QUESTIONS: Array<Field> = [
  {
    name: 'ELIGIBILITY_INTRO',
    stage: 1,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Eligibility criteria</span>,
    Help: (
      <span>
        Before we ask you more about what you need help with, we need to check
        you're eligibile for our service.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'GOVERNMENT_SUPPORT',
    stage: 1,
    effect: async (data: Data) => {
      if (data.GOVERNMENT_SUPPORT) {
        if (data.ISSUES === 'EVICTION') {
          return ROUTES.
        }
        // here we need to direct them to the problem they selected
        // e.g. Bond recovery, rental repair, unpaid rent
      }
    },
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Are you on government support?</span>,
  },
  {
    name: 'DEPENDENTS',
    stage: 1,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How many dependents do you have?</span>,
  },
]
