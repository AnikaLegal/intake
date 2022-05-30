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
    stage: 2,
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
    name: 'REPAIRS_ISSUE_PHOTO',
    stage: 2,
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
  {
    name: 'REPAIRS_ISSUE_START',
    stage: 2,
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
    name: 'REPAIRS_VCAT',
    stage: 2,
    effect: async (data: Data) => {
      if (data.REPAIRS_VCAT.includes('APPLIED_VCAT')) {
        return ROUTES.INELIGIBLE_REPAIRS_APPLIED_VCAT
      } else if (data.REPAIRS_VCAT.includes('GOTTEN_VCAT')) {
        return ROUTES.INELIGIBLE_REPAIRS_GOTTEN_VCAT
      }
    },
    askCondition: isRepairIssue,
    required: true,
    type: FIELD_TYPES.CHOICE_MULTI,
    choices: [
      { label: 'I told the landlord verbally', value: 'Landlord' },
      { label: "I've issued formal notices of breaches", value: 'Breaches' },
      { label: "I've applied to CAV for a report", value: 'CAV' },
      { label: "I've applied to VCAT", value: 'APPLIED_VCAT' },
      { label: "I've already gotten a VCAT order", value: 'GOTTEN_VCAT' },
    ],
    Prompt: <span>Have you done any of the following?</span>,
    Help: <span>Please select all that apply</span>,
  },
]
