//@flow
// All the questions in the questionnaire.
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import { api } from 'api'
import { storeFormData } from 'utils'
import type { Field, Data } from 'types'

const isRepairIssue = (data: Data) => data.ISSUES.includes('REPAIRS')

export const REPAIRS_QUESTIONS: Array<Field> = [
  {
    name: 'REPAIRS_INTRO',
    stage: 1,
    askCondition: isRepairIssue,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Rental repairs</span>,
    Help: (
      <span>
        Thanks for your answers so far. We have a few questions around your
        rental repairs.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'REPAIRS_REQUIRED',
    stage: 1,
    askCondition: isRepairIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_MULTI,
    choices: [
      { label: 'Water', value: 'Water' },
      { label: 'Roof', value: 'Roof' },
      { label: 'Heating or cooling', value: 'Heating or cooling' },
      { label: 'Toilet', value: 'Toilet' },
      { label: 'Cooking', value: 'Cooking' },
      { label: 'Electricity', value: 'Electricity' },
      { label: 'Fire', value: 'Fire' },
      { label: 'Gas', value: 'Gas' },
      { label: 'Laundry', value: 'Laundry' },
      { label: 'Other', value: 'Other' },
    ],
    Prompt: <span>What needs to be repaired?</span>,
    Help: <span>Choose as many as you need</span>,
  },
  {
    name: 'REPAIRS_ISSUE_DESCRIPTION',
    stage: 1,
    askCondition: isRepairIssue,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        Tell us more about the repair problems at your rental property.
      </span>
    ),
  },
  {
    name: 'REPAIRS_ISSUE_START',
    stage: 1,
    askCondition: isRepairIssue,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: <span>When did these problems first happen?</span>,
    Help: (
      <span>
        If you don't know the exact date, that's okay. An approximate date is
        fine.
      </span>
    ),
  },
  {
    name: 'REPAIRS_ISSUE_PHOTO',
    stage: 1,
    askCondition: isRepairIssue,
    required: false,
    type: FIELD_TYPES.UPLOAD,
    Prompt: (
      <span>Do you have any photos of the problems that you could upload?</span>
    ),
    Help: (
      <span>
        If you do not have any photos of the problems to upload, that’s okay.
      </span>
    ),
  },
]
