//@flow
// All the questions in the questionnaire.
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import type { Field, Data } from 'types'

const isEvictionIssue = (data: Data) =>
  data.ISSUES.includes('EVICTION_RETALIATORY')
const isEvictionIssueWithDate = (data: Data) =>
  isEvictionIssue(data) && data.EVICTIONS_IS_VCAT_DATE

export const EVICTION_QUESTIONS: Array<Field> = [
  {
    name: 'EVICTIONS_INTRO',
    stage: 2,
    askCondition: isEvictionIssue,

    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Eviction for unpaid rent</span>,
    Help: (
      <span>
        Thanks for your answers so far. We have a few questions about your
        eviction.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  // Eligibility questions
  {
    name: 'EVICTIONS_IS_ALREADY_REMOVED',
    stage: 2,
    askCondition: isEvictionIssue,
    effect: async (data: Data) => {
      if (data.EVICTIONS_IS_ALREADY_REMOVED) {
        return ROUTES.INELIGIBLE_EVICTED
      }
    },
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Have you been removed from your home?</span>,
  },
  {
    name: 'EVICTIONS_HAS_NOTICE',
    stage: 2,
    askCondition: isEvictionIssue,
    effect: async (data: Data) => {
      if (!data.EVICTIONS_HAS_NOTICE) {
        return ROUTES.INELIGIBLE_NO_EVICTIONS_NOTICE
      }
    },
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>
        Have you received a Notice to Vacate from your landlord or your real
        estate agent?
      </span>
    ),
    Help: (
      <span>
        It's a specific kind of legal document that{' '}
        <a href={LINKS.NOTICE_TO_VACATE_PDF}>looks like this</a>.
      </span>
    ),
  },
  {
    name: 'EVICTIONS_DOCUMENTS_UPLOAD',
    stage: 2,
    askCondition: isEvictionIssue,
    required: true,
    type: FIELD_TYPES.UPLOAD,
    Prompt: (
      <span>
        Please upload a copy of the Notice to Vacate that your landlord or agent
        has given you.
      </span>
    ),
  },
  {
    name: 'EVICTIONS_IS_UNPAID_RENT',
    stage: 2,
    askCondition: isEvictionIssue,
    effect: async (data: Data) => {
      if (!data.EVICTIONS_IS_UNPAID_RENT) {
        return ROUTES.INELIGIBLE_WRONG_REASON
      }
    },
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Unpaid rent', value: true },
      { label: 'Another reason', value: false },
    ],
    Prompt: (
      <span>
        Are you being evicted due to unpaid rent or some other reason?
      </span>
    ),
  },
  {
    name: 'EVICTIONS_IS_VCAT_DATE',
    stage: 2,
    askCondition: isEvictionIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>Have you been given a date for an evictions hearing at VCAT? </span>
    ),
  },
  {
    name: 'EVICTIONS_VCAT_DATE',
    stage: 2,
    askCondition: isEvictionIssueWithDate,
    effect: async (data: Data) => {
      var userDate = Date.parse(data.EVICTIONS_VCAT_DATE)
      var currentDate = Date.now()
      var fortnightAway = currentDate + 12096e5 // 14 days in milliseconds
      if (userDate <= fortnightAway) {
        return ROUTES.INELIGIBLE_VCAT_HEARING
      }
    },
    required: false,
    type: FIELD_TYPES.DATE,
    skipText: 'I do not know when the hearing is yet.',
    Prompt: <span>What date is the VCAT hearing?</span>,
  },
  {
    name: 'EVICTIONS_NOTICE_VACATE_DATE',
    stage: 2,
    askCondition: isEvictionIssue,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: (
      <span>
        What is the date that you are required to vacate the property?
      </span>
    ),
    Help: (
      <span>
        You will be able to find this information on the Notice to Vacate.
      </span>
    ),
  },
  {
    name: 'EVICTIONS_NOTICE_SEND_DATE',
    stage: 2,
    askCondition: isEvictionIssue,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: (
      <span>
        What date was the Notice to Vacate <strong>sent</strong> by your
        landlord?
      </span>
    ),
    Help: (
      <span>
        You will be able to find this information on the Notice to Vacate.
      </span>
    ),
  },
  {
    name: 'EVICTIONS_DOC_DELIVERY_TIME_NOTICE_TO_VACATE',
    stage: 2,
    askCondition: isEvictionIssue,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: (
      <span>
        When did you <strong>receive</strong> the Notice to Vacate?
      </span>
    ),
  },
  {
    name: 'EVICTIONS_PAYMENT_FAIL_REASON',
    stage: 2,
    askCondition: isEvictionIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_MULTI,
    Prompt: <span>Why did you fall behind on rent payments?</span>,
    choices: [
      { label: 'Reduced income', value: 'Reduced income' },
      { label: 'Unable to work', value: 'Unable to work' },
      { label: 'Decline in health', value: 'Decline in health' },
      {
        label: 'Another tenant moving out',
        value: 'Another tenant moving out',
      },
      { label: 'Family violence', value: 'Family violence' },
      { label: 'Loss of job', value: 'Loss of job' },
      { label: 'Struggling financially', value: 'Struggling financially' },
      { label: 'Another reason', value: 'Another reason' },
    ],
  },
  {
    name: 'EVICTIONS_PAYMENT_FAIL_DESCRIPTION',
    stage: 2,
    askCondition: isEvictionIssue,
    required: false,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>Tell us about why you fell behind on rent payments.</span>,
    Help: (
      <span>
        Please provide only as much information as you are comfortable with
        sharing.
      </span>
    ),
  },
]
