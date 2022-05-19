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
        window.location.href = 'http://localhost:3001/intake/form/12/'
        // Note: Need to change this for the test site and live site
        // test site - https://test-intake.anikalegal.com/intake/form/12/
        // live site - https://intake.anikalegal.com/intake/form/12/
        // HOW DOES IT USUALLY KNOW WHICH ISSUE TO DIRECT TO ONCE ABOUT SECTION IS COMPLETE
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
      if (data.DEPENDENTS === 0 && data.WEEKLY_HOUSEHOLD_INCOME > 90000) {
        if (data.APPLY === '') {
          
        }
      }
    },
    required: true,
    type: FIELD_TYPES.CHOICE_MULTI,
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
        label: 'You identify as Aboriginal or Torres Strait Islander',
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
  {
    name: 'NONELIGIBLE',
    stage: 1,
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
]
