//@flow
// All the questions in the questionnaire.
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import type { Field, Data } from 'types'

const isEvictionIssue = (data: Data) => data.ISSUES.includes('EVICTION')

export const EVICTION_QUESTIONS: Array<Field> = [
  {
    name: 'EVICTIONS_INTRO',
    stage: 1,
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
    name: 'EVICTIONS_IS_UNPAID_RENT',
    stage: 1,
    askCondition: isEvictionIssue,
    effect: async (data: Data) => {
      if (!data.EVICTIONS_IS_UNPAID_RENT) {
        return ROUTES.INELIGIBLE_NOT_UNPAID_RENT
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
    name: 'EVICTIONS_IS_ALREADY_REMOVED',
    stage: 1,
    askCondition: isEvictionIssue,
    effect: async (data: Data) => {
      if (data.EVICTIONS_IS_ALREADY_REMOVED) {
        return ROUTES.INELIGIBLE_ALREADY_REMOVED
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
    stage: 1,
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
    stage: 1,
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
    name: 'EVICTIONS_NOTICE_VACATE_DATE',
    stage: 1,
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
    stage: 1,
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
    stage: 1,
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
    name: 'EVICTIONS_DOC_DELIVERY_METHOD_NOTICE_TO_VACATE',
    stage: 1,
    askCondition: isEvictionIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Delivered personally', value: 'Delivered personally' },
      { label: 'By registered post', value: 'By registered post' },
      { label: 'By email', value: 'By email' },
      { label: 'Another delivery method', value: 'Another delivery method' },
    ],
    Prompt: <span>How did you receive the Notice to Vacate?</span>,
  },
  {
    name: 'EVICTIONS_IS_VCAT_DATE',
    stage: 1,
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
    stage: 1,
    askCondition: (data) =>
      isEvictionIssue(data) && data.EVICTIONS_IS_VCAT_DATE,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: <span>What date is the VCAT hearing?</span>,
  },
  {
    name: 'EVICTIONS_RENT_UNPAID',
    stage: 1,
    askCondition: isEvictionIssue,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How much rent is unpaid?</span>,
  },
  {
    name: 'EVICTIONS_RENT_CYCLE',
    stage: 1,
    askCondition: isEvictionIssue,
    required: true,
    Prompt: <span>How often do you pay your rent?</span>,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Weekly', value: 'WEEKLY' },
      { label: 'Fortnightly', value: 'FORTNIGHTLY' },
      { label: 'Monthly', value: 'MONTHLY' },
      { label: 'Quarterly', value: 'QUATERLY' },
      { label: 'Other', value: 'OTHER' },
    ],
  },
  {
    name: 'EVICTIONS_IS_ON_PAYMENT_PLAN',
    stage: 1,
    askCondition: isEvictionIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>Are you currently on a payment plan with your landlord?</span>
    ),
    Help: (
      <span>
        This is an agreement where you pay back extra rent to cover the
        previously unpaid rent.
      </span>
    ),
  },
  {
    name: 'EVICTIONS_CAN_AFFORD_PAYMENT_PLAN',
    stage: 1,
    askCondition: (data) =>
      isEvictionIssue(data) && !data.EVICTIONS_IS_ON_PAYMENT_PLAN,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: 'YES' },
      { label: 'No', value: 'NO' },
      { label: 'Prefer to discuss over phone', value: 'DISCUSS_OVER_PHONE' },
    ],
    Prompt: (
      <span>
        Would you be able to afford a payment plan with your landlord?
      </span>
    ),
  },
  // Payment plan stuff
  {
    name: 'EVICTIONS_PAYMENT_AMOUNT',
    stage: 1,
    askCondition: (data) =>
      isEvictionIssue(data) &&
      !data.EVICTIONS_IS_ON_PAYMENT_PLAN &&
      data.EVICTIONS_CAN_AFFORD_PAYMENT_PLAN == 'YES',
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: (
      <span>
        How much additional rent could you pay on top of your normal rent
        payment?
      </span>
    ),
    Help: <span>This would be to pay off the unpaid rent</span>,
  },
  {
    name: 'EVICTIONS_PAYMENT_FAIL_REASON',
    stage: 1,
    askCondition: (data) =>
      isEvictionIssue(data) &&
      !data.EVICTIONS_IS_ON_PAYMENT_PLAN &&
      data.EVICTIONS_CAN_AFFORD_PAYMENT_PLAN == 'YES',
    required: true,
    type: FIELD_TYPES.CHOICE_MULTI,
    Prompt: <span>Why did you fall behind on rent payments?</span>,
    choices: [
      { label: 'Reduced income', value: 'Reduced income' },
      { label: 'Unable to work', value: 'Unable to work' },
      { label: 'Emotional distress', value: 'Emotional distress' },
      {
        label: 'Another tenant moving out',
        value: 'Another tenant moving out',
      },
      { label: 'Another reason', value: 'Another reason' },
    ],
  },
  {
    name: 'EVICTIONS_PAYMENT_FAIL_DESCRIPTION',
    stage: 1,
    askCondition: (data) =>
      isEvictionIssue(data) &&
      !data.EVICTIONS_IS_ON_PAYMENT_PLAN &&
      data.EVICTIONS_CAN_AFFORD_PAYMENT_PLAN == 'YES',
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
  {
    name: 'EVICTIONS_PAYMENT_FAIL_CHANGE',
    stage: 1,
    askCondition: (data) =>
      isEvictionIssue(data) &&
      !data.EVICTIONS_IS_ON_PAYMENT_PLAN &&
      data.EVICTIONS_CAN_AFFORD_PAYMENT_PLAN == 'YES',
    required: false,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        What circumstances have changed to allow you to afford the rent?
      </span>
    ),
    Help: (
      <span>
        Please provide only as much information as you are comfortable with
        sharing.
      </span>
    ),
  },
  {
    name: 'EVICTIONS_MISC',
    stage: 1,
    askCondition: isEvictionIssue,
    required: false,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        Is there anything else that you would like us to know about your
        evictions issue?
      </span>
    ),
  },
]
