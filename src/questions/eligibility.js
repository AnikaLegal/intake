import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import { api } from 'api'
import { storeFormData } from 'utils'
import type { Field, Data } from 'types'
import { ISSUE_QUESTIONS } from './issues'

const isEvictionIssue = (data: Data) =>
  data.ISSUES.includes('EVICTION_RETALIATORY')
const notCentrelinkSupport = (data: Data) => !data.CENTRELINK_SUPPORT
const ineligibleCriteria = (data: Data) =>
  notCentrelinkSupport(data) && (
    (data.NUMBER_OF_DEPENDENTS === 0 && data.WEEKLY_HOUSEHOLD_INCOME > 1731) ||
    (data.NUMBER_OF_DEPENDENTS === 1 && data.WEEKLY_HOUSEHOLD_INCOME > 2212) ||
    (data.NUMBER_OF_DEPENDENTS === 2 && data.WEEKLY_HOUSEHOLD_INCOME > 2212) ||
    (data.NUMBER_OF_DEPENDENTS === 3 && data.WEEKLY_HOUSEHOLD_INCOME > 2693) ||
    (data.NUMBER_OF_DEPENDENTS === 4 && data.WEEKLY_HOUSEHOLD_INCOME > 2693) ||
    (data.NUMBER_OF_DEPENDENTS === 5 && data.WEEKLY_HOUSEHOLD_INCOME > 2981)) &&
  data.ELIGIBILITY_CIRCUMSTANCES === null

export const ELIGIBILITY_QUESTIONS: Array<Field> = [
  {
    name: 'PRE_EVICTION_NOTICE',
    stage: 1,
    askCondition: isEvictionIssue,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>
      Anika Legal can help you with evictions if you believe the eviction is retaliatory.
    </span>,
    Help: (
      <span>
        If your eviction isn't retaliatory, follow the link below to see what
        other help is available in your area [Link to VLA]. Otherwise please continue.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'ELIGIBILITY_INTRO',
    stage: 1,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: <span>Eligibility criteria</span>,
    Help: (
      <span>
        Before we ask you more about what you need help with, we need to check
        you're eligible for our service.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'CENTRELINK_SUPPORT',
    stage: 1,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Are you currently receiving Centrelink payment?</span>,
  },
  {
    name: 'NUMBER_OF_DEPENDENTS',
    stage: 1,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How many dependents do you have?</span>,
  },
  {
    name: 'WEEKLY_HOUSEHOLD_INCOME',
    askCondition: notCentrelinkSupport,
    stage: 1,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How much is your weekly household income?</span>,
  },
  {
    name: 'ELIGIBILITY_CIRCUMSTANCES',
    stage: 1,
    required: false,
    type: FIELD_TYPES.CHOICE_MULTI,
    skipText: 'None of the above apply to me',
    choices: [
      {
        label: 'You live in public housing or community housing',
        value: 'HOUSING',
      },
      { label: 'You have a mental illness', value: 'MENTAL_ILLNESS' },
      {
        label: 'You have a intellectual disability',
        value: 'INTELLECTUAL_DISABILITY',
      },
      { label: 'You have a physical disability', value: 'PHYSICAL_DISABILITY' },
      {
        label:
          'You are on one of the following visa types: Student Visa, Seasonal Worker Visa, Temporary Protection Visa, Safe Haven Enterprise Visa, Permanent Protection Visa, or Bridging Visa awaiting processing of one of the above visa types.',
        value: 'VISA',
      },
      {
        label: 'You are currently/recently experiencing family violence',
        value: 'FAMILY_VIOLENCE',
      },
      {
        label:
          'You are experiencing an unexpected circumstance which has impacted on your current situation i.e., loss of job.',
        value: 'UNEXPECTED_CIRCUMSTANCE',
      },
      {
        label: 'You have experienced substance abuse',
        value: 'SUBSTANCE_ABUSE',
      },
      {
        label: 'You identify as an Aboriginal or Torres Strait Islander person',
        value: 'ABORIGINAL_OR_TORRES_STRAIT',
      },
      {
        label: 'You are renting in a remote or regional location',
        value: 'RENTING',
      },
      {
        label:
          'You are struggling to pay bills, repayments or insurance premiums',
        value: 'STRUGGLING',
      },
    ],
    Prompt: <span>Do any of the following apply to you?</span>,
  },
  {
    name: 'INELIGIBLE_CHOICE',
    stage: 1,
    askCondition: ineligibleCriteria,
    effect: async (data: Data) => {
      if (!data.INELIGIBLE_CHOICE) {
        return ROUTES.INELIGIBLE_MEANS
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
        It looks like you're not eligible for our service. If you continue with
        our intake form, we cannot guarantee that we can assist you. Would you
        still like to continue?
      </span>
    ),
  },
  {
    name: 'ELIGIBILITY_NOTES',
    stage: 1,
    askCondition: ineligibleCriteria,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        So that we can assess your circumstances holistically, please tell us if
        you have any other special circumstances that you would like us to
        consider.
      </span>
    ),
  },
]
