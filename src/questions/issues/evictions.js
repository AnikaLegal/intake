//@flow
// All the questions in the questionnaire.
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import { api } from 'api'
import { storeFormData } from 'utils'
import type { Field, Data } from 'types'

const isEvictionIssue = (data: Data) => data.ISSUES.includes('EVICTION')

const DOC_TYPES = [
  {
    name: 'Notice to Vacate',
    key: 'NOTICE_TO_VACATE',
    lower: 'Notice to Vacate',
  },
  {
    name: 'Application for a Possession Order',
    key: 'POSSESION_ORDER',
    lower: 'Application for a Possession Order',
  },
  {
    name: 'Form 15 - Notice of Objection',
    key: 'FORM_15',
    lower: 'Form 15 - Notice of Objection',
  },
  {
    name: 'Form 16 - Rights in relation to a Possession Order',
    key: 'FORM-16',
    lower: 'Form 16 - Rights in relation to a Possession Order',
  },
  { name: 'Other documents', key: 'OTHER_DOCS', lower: 'other documents' },
]

const DOC_DELIVERY_METHOD_QS = DOC_TYPES.map((d) => ({
  name: `EVICTIONS_DOC_DELIVERY_METHOD_${d.key}`,
  stage: 1,
  askCondition: (data) =>
    isEvictionIssue(data) && data.EVICTIONS_DOCUMENTS_PROVIDED.includes(d.name),
  required: true,
  type: FIELD_TYPES.CHOICE_SINGLE,
  choices: [
    { label: 'Delivered personally', value: 'Delivered personally' },
    { label: 'By registered post', value: 'By registered post' },
    { label: 'By email', value: 'By email' },
    { label: 'Another delivery method', value: 'Another delivery method' },
  ],
  Prompt: <span>How did you receive the {d.lower}?</span>,
}))
const DOC_DELIVERY_TIME_QS = DOC_TYPES.map((d) => ({
  name: `EVICTIONS_DOC_DELIVERY_TIME_${d.key}`,
  stage: 1,
  askCondition: (data) =>
    isEvictionIssue(data) && data.EVICTIONS_DOCUMENTS_PROVIDED.includes(d.name),
  required: true,
  type: FIELD_TYPES.DATE,
  Prompt: <span>When did you receive the {d.lower}?</span>,
}))

const DOC_DELIVERY_QS = []
for (let i = 0; i < DOC_TYPES.length; i++) {
  DOC_DELIVERY_QS.push(DOC_DELIVERY_METHOD_QS[i])
  DOC_DELIVERY_QS.push(DOC_DELIVERY_TIME_QS[i])
}

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
        Thank you for your responses so far. We will now ask a few questions
        around your eviction.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  // Eligibility questions
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
  },
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
    Prompt: (
      <span>
        Have you already been forcibly removed from your home by the police?
      </span>
    ),
  },
  {
    name: 'EVICTIONS_DOCUMENTS_PROVIDED',
    stage: 1,
    askCondition: isEvictionIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_MULTI,
    choices: DOC_TYPES.map((d) => ({ label: d.name, value: d.name })),
    Prompt: (
      <span>
        What documents did the landlord provide to you in relation to your
        eviction?
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
        Please upload a copy of all the documentation your landlord or agent has
        provided you in relation to your eviction.
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
  ...DOC_DELIVERY_QS,
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
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Weekly', value: 'Weekly' },
      { label: 'Fortnightly', value: 'Fortnightly' },
      { label: 'Monthly', value: 'Monthly' },
      { label: 'Quarterly', value: 'Quarterly' },
      { label: 'Other', value: 'Other' },
    ],
    Prompt: <span>What cycles do you usually use to pay your rent?</span>,
  },
  {
    name: 'EVICTIONS_CAN_AFFORD_PAYMENT_PLAN',
    stage: 1,
    askCondition: isEvictionIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>
        Would you be able to afford agreeing to a payment plan with your
        landlord?
      </span>
    ),
  },
  // Payment plan stuff
  {
    name: 'EVICTIONS_PAYMENT_AMOUNT',
    stage: 1,
    askCondition: (data) =>
      isEvictionIssue(data) && data.EVICTIONS_CAN_AFFORD_PAYMENT_PLAN,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: (
      <span>How much extra rent would you be able to pay each rent cycle?</span>
    ),
  },
  {
    name: 'EVICTIONS_PAYMENT_FAIL_REASON',
    stage: 1,
    askCondition: (data) =>
      isEvictionIssue(data) && data.EVICTIONS_CAN_AFFORD_PAYMENT_PLAN,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    Prompt: (
      <span>What was the cause for you to fall behind on rent payments?</span>
    ),
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
      isEvictionIssue(data) && data.EVICTIONS_CAN_AFFORD_PAYMENT_PLAN,
    required: false,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        Tell us a short description of what caused you to fall behind on rent
        payments.
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
    name: 'EVICTIONS_PAYMENT_FAIL_CHANGE',
    stage: 1,
    askCondition: (data) =>
      isEvictionIssue(data) && data.EVICTIONS_CAN_AFFORD_PAYMENT_PLAN,
    required: true,
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
