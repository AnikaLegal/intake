import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import { api } from 'api'
import type { Field, Data } from 'types'
import { ISSUE_QUESTIONS } from './issues'
import { isRetaliatoryEvictionIssue } from './issues/eviction-retaliatory'

const notCentrelinkSupport = (data: Data) => !data.CENTRELINK_SUPPORT

/* Possibly ineligible if 
 * - not on Centrelink support and 
 * - no special circumstances and
 * - (less than 6 dependants if income over 155k or
 *    less than 5 dependants if income 140-155k or
 *    less than 3 dependants if income 115-140k or
 *    no dependants if income 90-114k).
 * Note that the other ranges are for data collection purposes and don't affect
 * possible eligibility.
 */
const ineligibleCriteria = (data: Data) =>
  notCentrelinkSupport(data) &&
  data.ELIGIBILITY_CIRCUMSTANCES === null &&
  ((data.ANNUAL_INCOME_RANGE === "OVER_155K" && data.NUMBER_OF_DEPENDENTS < 6) ||
    (data.ANNUAL_INCOME_RANGE === "FROM_140K_TO_155K" && data.NUMBER_OF_DEPENDENTS < 5) ||
    (data.ANNUAL_INCOME_RANGE === "FROM_115K_TO_139K" && data.NUMBER_OF_DEPENDENTS < 3) ||
    (data.ANNUAL_INCOME_RANGE === "FROM_90K_TO_114K" && data.NUMBER_OF_DEPENDENTS < 1))


export const ELIGIBILITY_QUESTIONS: Array<Field> = [
  {
    name: 'INTRO',
    stage: 0,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: (
      <span>
        First of all, congratulations on taking the first step in solving your
        rental issues.
      </span>
    ),
    Help: (
      <span>
        Once you submit this form, we'll give you a phone call or email in a few
        business days to talk about how we can help you.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'ISSUES',
    stage: 0,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: "I'm having issues with my bond", value: 'BONDS' },
      {
        label: "My landlord won't fix repairs", value: 'REPAIRS'
      },
      {
        label: "I've received an eviction notice",
        value: 'EVICTION_RETALIATORY',
      },
      {
        label: 'I want compensation from my landlord',
        value: 'INELIGIBLE_COMPENSATION',
      },
    ],
    effect: async (data: Data) => {
      if (data.ISSUES === 'INELIGIBLE_COMPENSATION') {
        return ROUTES.LEGAL_SCOPE_COMPENSATION
      }
    },
    Prompt: <span>What do you need help with?</span>,
    Help: (
      <span>
        Anika can help with{' '}
        <a target="_blank" href={LINKS.BONDS_INFO}>
          bond recovery
        </a>{' '}
        {', '}
        <a target="_blank" href={LINKS.REPAIRS_INFO}>
          rental repairs
        </a>
        {' and '}
        <a target="_blank" href={LINKS.EVICTION_INFO}>
          retaliatory evictions.
        </a>{' '}
      </span>
    ),
  },
  {
    name: 'PRE_EVICTION_NOTICE',
    stage: 0,
    askCondition: isRetaliatoryEvictionIssue,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: (
      <span>
        Anika Legal can only help you with evictions if you believe the eviction is retaliatory.
      </span>
    ),
    Help: (
      <span>
        If your eviction isn't retaliatory, see what <a
          href={LINKS.VIC_LEGAL_AID}>other legal help</a> is available in your
        area. Otherwise please continue.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'IS_VICTORIAN_TENANT',
    stage: 0,
    effect: async (data: Data) => {
      if (!data.IS_VICTORIAN_TENANT) {
        return ROUTES.GEOGRAPHY
      }
    },
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Are you renting a property in Victoria?</span>,
  },
  {
    name: 'ELIGIBILITY_INTRO',
    stage: 0,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    Prompt: (
      <span>
        You're in the right place.
      </span>
    ),
    Help: (
      <span>
        We just need a few more details to understand your situation and how we can help.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'CENTRELINK_SUPPORT',
    stage: 0,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Do you currently receive any government support?</span>,
  },
  {
    name: 'ANNUAL_INCOME_RANGE',
    askCondition: notCentrelinkSupport,
    stage: 0,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Under $40,000', value: "UNDER_40K" },
      { label: '$40,000 - $64,000', value: "FROM_40K_TO_64K" },
      { label: '$65,000 - $89,000', value: "FROM_65K_TO_89K" },
      { label: '$90,000 - $114,000', value: "FROM_90K_TO_114K" },
      { label: '$115,000 - $139,000', value: "FROM_115K_TO_139K" },
      { label: '$140,000 - $155,000', value: "FROM_140K_TO_155K" },
      { label: 'Over $155,000', value: "OVER_155K" },
    ],
    Prompt: <span>Is your household annual income roughly within these ranges?</span>,
  },
  {
    name: 'NUMBER_OF_DEPENDENTS',
    stage: 0,
    required: false,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How many dependants do you have?</span>,
    skipText: 'I do not have any dependants',
    effect: async (data: Data) => {
      if (!data.NUMBER_OF_DEPENDENTS) {
        data.NUMBER_OF_DEPENDENTS = 0
      }
    },
  },
  {
    name: 'ELIGIBILITY_CIRCUMSTANCES',
    stage: 0,
    required: false,
    type: FIELD_TYPES.CHOICE_MULTI,
    skipText: 'Skip',
    Help: "This helps us prioritise support. You can skip this if you're not sure.",
    choices: [
      {
        label: "I'm experiencing financial stress",
        value: 'STRUGGLING',
      },
      {
        label: 'I live in public or community housing',
        value: 'HOUSING',
      },
      { label: "I'm a single parent", value: 'SINGLE_PARENT' },
      {
        label: "I have a physical disability",
        value: 'PHYSICAL_DISABILITY',
      },
      {
        label: "I have a cognitive disability",
        value: 'INTELLECTUAL_DISABILITY',
      },
      {
        label: "I have a mental health condition",
        value: 'MENTAL_ILLNESS',
      },
      {
        label: "I'm experiencing or at risk of family violence",
        value: 'FAMILY_VIOLENCE',
      },
      {
        label: "I'm on a temporary or bridging visa",
        value: 'VISA',
      },
      {
        label: "I'm renting in a remote or regional location",
        value: 'RENTING',
      },
      {
        label: "I identify as Aboriginal or Torres Strait Islander",
        value: 'ABORIGINAL_OR_TORRES_STRAIT',
      },
    ],
    Prompt: <span>Do any of the following apply to you?</span>,
  },
  {
    name: 'INELIGIBLE_CHOICE',
    stage: 0,
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
    stage: 0,
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
