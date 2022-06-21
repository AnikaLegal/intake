import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import { api } from 'api'
import { storeFormData } from 'utils'
import type { Field, Data } from 'types'
import { ISSUE_QUESTIONS } from './issues'

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
    name: 'CENTRELINK_SUPPORT',
    stage: 1,
    effect: async (data: Data) => {
      if (data.CENTRELINK_SUPPORT) {
        window.location.href =
          'https://test-intake.anikalegal.com/intake/form/14/'
        // Note: Need to change this depending if it's local, test or live.
        // local site - http://localhost:3001/intake/form/14/
        // test site - https://test-intake.anikalegal.com/intake/form/14/
        // live site - https://intake.anikalegal.com/intake/form/14/
      }
    },
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Are you currently receiving Centrelink payment?</span>,
  },
  {
    name: 'DEPENDENTS',
    stage: 1,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How many dependents do you have?</span>,
  },
  {
    name: 'WEEKLY_HOUSEHOLD_INCOME',
    stage: 1,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How much is your weekly household income?</span>,
  },
  {
    name: 'APPLY',
    stage: 1,
    effect: async (data: Data) => {
      if (
        (data.DEPENDENTS === 0 &&
          data.WEEKLY_HOUSEHOLD_INCOME > 1731 &&
          data.APPLY.length === 0) ||
        (data.DEPENDENTS === 1 &&
          data.WEEKLY_HOUSEHOLD_INCOME > 2212 &&
          data.APPLY.length === 0) ||
        (data.DEPENDENTS === 2 &&
          data.WEEKLY_HOUSEHOLD_INCOME > 2212 &&
          data.APPLY.length === 0) ||
        (data.DEPENDENTS === 3 &&
          data.WEEKLY_HOUSEHOLD_INCOME > 2693 &&
          data.APPLY.length === 0) ||
        (data.DEPENDENTS === 4 &&
          data.WEEKLY_HOUSEHOLD_INCOME > 2693 &&
          data.APPLY.length === 0) ||
        (data.DEPENDENTS === 5 &&
          data.WEEKLY_HOUSEHOLD_INCOME > 2981 &&
          data.APPLY.length === 0)
      ) {
        return ROUTES.INELIGIBLE_CHOICE
        // Currently a user can click an option then click skip and the option will still apply meaning they are actually ineligible but go through due to the skip button functionality not deselecting user input.
      }
    },
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
        value: 'IDENTIFY',
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
]
