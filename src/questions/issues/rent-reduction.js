//@flow
// All the questions in the questionnaire.
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import { api } from 'api'
import { storeFormData } from 'utils'
import type { Field, Data } from 'types'

const isRentReductionIssue = (data: Data) =>
  data.ISSUES.includes('RENT_REDUCTION')

export const RENT_REDUCTION_QUESTIONS: Array<Field> = [
  {
    name: 'RENT_REDUCTION_INTRO',
    stage: 1,
    askCondition: isRentReductionIssue,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Rent reduction</span>,
    Help: (
      <span>
        Thanks for your answers so far. We have some questions about your rental
        situation.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'RENT_REDUCTION_ISSUES',
    stage: 1,
    askCondition: isRentReductionIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_MULTI,
    choices: [
      { label: 'Reduced income', value: 'Reduced income' },
      { label: 'Unable to work', value: 'Unable to work' },
      { label: 'Emotional distress', value: 'Emotional distress' },
      {
        label: 'Another tenant moved out',
        value: 'Another tenant moved out',
      },
      { label: 'Other', value: 'Other' },
    ],
    Prompt: <span>How have you been affected by COVID-19?</span>,
    Help: <span>Choose as many as you need</span>,
  },
  {
    name: 'RENT_REDUCTION_ISSUE_DESCRIPTION',
    stage: 1,
    askCondition: isRentReductionIssue,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>Tell us about how you have been affected by COVID-19.</span>,
  },
  {
    name: 'RENT_REDUCTION_ISSUE_START',
    stage: 1,
    askCondition: isRentReductionIssue,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: <span>When did these problems start happening?</span>,
    Help: (
      <span>
        If you don't know the exact date, that's okay. An approximate date is
        fine.
      </span>
    ),
  },
  {
    name: 'RENT_REDUCTION_ISSUE_PHOTO',
    stage: 1,
    askCondition: isRentReductionIssue,
    required: false,
    type: FIELD_TYPES.UPLOAD,
    Prompt: (
      <span>
        Please upload a photo of any evidence of how you have been affected by
        COVID-19.
      </span>
    ),
    Help: (
      <span>
        For example, if you have lost your job and have received a letter of
        termination, please upload the a photo letter of termination. Providing
        evidence will increase your chance of obtaining a rent reduction but if
        you don't have any right now that is ok.
      </span>
    ),
  },
  {
    name: 'RENT_REDUCTION_IS_NOTICE_TO_VACATE',
    stage: 1,
    askCondition: isRentReductionIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>
        Has the landlord tried to evict you by giving you a Notice to Vacate?
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
    name: 'RENT_REDUCTION_NOTICE_TO_VACATE_DOCUMENT',
    stage: 1,
    askCondition: (data: Data) =>
      isRentReductionIssue(data) && data.RENT_REDUCTION_IS_NOTICE_TO_VACATE,
    required: false,
    type: FIELD_TYPES.UPLOAD,
    Prompt: (
      <span>
        Please upload a photo of the Notice to Vacate that the landlord sent.
      </span>
    ),
  },
]
