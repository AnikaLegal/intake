//@flow
// All the questions in the questionnaire.
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import { api } from 'api'
import { storeFormData } from 'utils'
import type { Field, Data } from 'types'

import { RENT_REDUCTION_QUESTIONS } from './rent-reduction'
import { REPAIRS_QUESTIONS } from './repairs'
import { EVICTION_QUESTIONS } from './evictions'

export const ISSUE_QUESTIONS: Array<Field> = [
  {
    name: 'ISSUES',
    stage: 1,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'I am being evicted for unpaid rent', value: 'EVICTION' },
      { label: 'I need something repaired', value: 'REPAIRS' },
      { label: 'I need a reduction in rent', value: 'RENT_REDUCTION' },
    ],
    Prompt: <span>What do you need help with?</span>,
    effect: async (data: Data) => {
      const sub = await api.submission.create(data)
      const formData = { ...data, id: sub.id }
      storeFormData(formData)
    },
  },
  {
    name: 'START_DATE',
    stage: 1,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: <span>When did you start living at this property?</span>,
  },
  {
    name: 'IS_ON_LEASE',
    stage: 1,
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
  },
  ...REPAIRS_QUESTIONS,
  ...RENT_REDUCTION_QUESTIONS,
  ...EVICTION_QUESTIONS,
]
