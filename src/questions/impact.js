//@flow
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import { api } from 'api'
import { storeFormData } from 'utils'
import type { Field, Data } from 'types'

export const IMPACT_QUESTIONS: Array<Field> = [
  {
    name: 'IMPACT_INTRO',
    stage: 4,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    effect: async (data: Data) => {
      events.onLandlordDetailsComplete()
    },
    Prompt: (
      <span>
        Great job. That is all the questions we have about your landlord.
        Finally, we just need a few details about you.
      </span>
    ),
    Help: (
      <span>
        These details will help us to better understand who you are and when we
        can contact you.
      </span>
    ),
    button: { text: 'Continue', Icon: null },
  },
  {
    name: 'DOB',
    stage: 4,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: <span>What is your date of birth?</span>,
  },
  {
    name: 'GENDER',
    stage: 4,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Genderqueer or non-binary', value: 'genderqueer' },
      { label: 'Prefer not to say', value: 'omitted' },
      { label: 'Other', value: 'other' },
    ],
    Prompt: <span>What gender do you identify as?</span>,
  },
  {
    name: 'IS_ABORIGINAL_OR_TORRES_STRAIT_ISLANDER',
    stage: 4,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>Are you of Aboriginal or Torres Strait Islander origin?</span>
    ),
  },
  {
    name: 'CAN_SPEAK_NON_ENGLISH',
    stage: 4,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>
        Do you speak a <strong>first</strong> language other than English?
      </span>
    ),
  },
  {
    name: 'FIRST_LANGUAGE',
    stage: 4,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        What is your <strong>first</strong> language?
      </span>
    ),
    askCondition: (data) => data.CAN_SPEAK_NON_ENGLISH,
  },
  {
    name: 'WORK_OR_STUDY_CIRCUMSTANCES',
    stage: 4,
    required: true,
    Prompt: <span>Which best describes your work or study situation?</span>,
    type: FIELD_TYPES.CHOICE_MULTI,
    choices: [
      {
        label: 'Working part time or casually',
        value: 'WORKING_PART_TIME',
      },
      { label: 'Working full time', value: 'WORKING_FULL_TIME' },
      { label: 'Student', value: 'STUDENT' },
      { label: 'Apprentice or trainee', value: 'APPRENTICE' },
      { label: 'Looking for work', value: 'LOOKING_FOR_WORK' },
      {
        label: 'Income reduced due to COVID-19',
        value: 'INCOME_REDUCED_COVID',
      },
      { label: 'Retired', value: 'RETIRED' },
      { label: 'None of the above', value: null },
    ],
  },

  // Income and rent payments
  {
    name: 'IS_MULTI_INCOME_HOUSEHOLD',
    stage: 4,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>
        Are there other members of your household contributing to your income?
      </span>
    ),
    Help: (
      <span>
        For example, a partner, spouse or parent who help you pay the rent
      </span>
    ),
  },
  {
    name: 'WEEKLY_INCOME',
    stage: 4,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>What is your weekly personal income?</span>,
    askCondition: (data) => !data.IS_MULTI_INCOME_HOUSEHOLD,
  },
  {
    name: 'WEEKLY_INCOME_MULTI',
    stage: 4,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>What is your combined household weekly income?</span>,
    Help: (
      <span>
        That is, the combined income of you and your partner, spouse or parent
      </span>
    ),
    askCondition: (data) => data.IS_MULTI_INCOME_HOUSEHOLD,
  },
  {
    name: 'WEEKLY_RENT',
    stage: 4,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How much rent do you pay per week?</span>,
    askCondition: (data) => !data.IS_MULTI_INCOME_HOUSEHOLD,
  },
  {
    name: 'WEEKLY_RENT_MULTI',
    stage: 4,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How much rent do you and your partner pay per week?</span>,
    askCondition: (data) => data.IS_MULTI_INCOME_HOUSEHOLD,
  },

  {
    name: 'NUMBER_OF_DEPENDENTS',
    stage: 4,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>How many dependents do you have?</span>,
    Help: (
      <span>
        People who rely on your support, like a stay-at-home spouse or children
      </span>
    ),
  },

  {
    name: 'SPECIAL_CIRCUMSTANCES',
    stage: 4,
    required: false,
    type: FIELD_TYPES.CHOICE_MULTI,
    Prompt: <span>Do any of the following apply to you?</span>,
    choices: [
      {
        label: 'I receive a Centrelink payment or have a concession card',
        value: 'CENTRELINK',
      },
      {
        label: 'I have a mental illness or intellectual disability',
        value: 'MENTAL_ILLNESS_OR_DISABILITY',
      },
      {
        label: 'I am currently living in public or community housing',
        value: 'PUBLIC_HOUSING',
      },
      {
        label: 'I am experiencing (or at risk of) family violence',
        value: 'FAMILY_VIOLENCE',
      },
      {
        label:
          'I have a long-term health condition or a disability that affects my work or education',
        value: 'HEALTH_CONDITION',
      },
      {
        label: 'I have refugee or asylum seeker status',
        value: 'REFUGEE',
      },
    ],
  },
  {
    name: 'LEGAL_ACCESS_DIFFICULTIES',
    stage: 4,
    required: false,
    type: FIELD_TYPES.CHOICE_MULTI,
    Prompt: (
      <span>
        Do any of the following make it difficult for you to get legal help?
      </span>
    ),
    choices: [
      {
        label: 'Substance abuse issues',
        value: 'SUBSTANCE_ABUSE',
      },
      { label: 'Have parent/caring duties', value: 'CARING' },
      { label: 'A physical disability', value: 'DISABILITY' },
      { label: 'Other', value: 'OTHER' },
    ],
  },

  {
    name: 'REFERRER_TYPE',
    stage: 4,
    required: true,
    Prompt: <span>How did you hear about Anika?</span>,
    type: FIELD_TYPES.CHOICE_SINGLE,
    effect: async (data: Data) => {
      // Not the final question but pretty close.
      events.onPersonalDetailsComplete()
    },
    choices: [
      {
        label: 'Legal centre',
        value: 'LEGAL_CENTRE',
      },
      { label: 'Housing service', value: 'HOUSING_SERVICE' },
      { label: 'Charity / non-profit', value: 'CHARITY' },
      { label: 'Social media', value: 'SOCIAL_MEDIA' },
      { label: 'Google search', value: 'SEARCH' },
      { label: 'Word of mouth', value: 'WORD_OF_MOUTH' },
      { label: 'Online ad', value: 'ONLINE_AD' },
      { label: 'Radio', value: 'RADIO' },
      { label: 'Billboard', value: 'BILLBOARD' },
      { label: 'Poster', value: 'POSTER' },
    ],
  },
  {
    name: 'LEGAL_CENTER_REFERRER',
    stage: 4,
    required: true,
    askCondition: (data: Data) => data.REFERRER_TYPE == 'LEGAL_CENTRE',
    Prompt: <span>Which legal centre referred you?</span>,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Tenants Victoria', value: 'Tenants Victoria' },
      { label: 'Victoria Legal Aid', value: 'Victoria Legal Aid' },
      { label: 'Justice Connect', value: 'Justice Connect' },
      {
        label: 'Consumer Affairs Victoria',
        value: 'Consumer Affairs Victoria',
      },
      {
        label: 'Asylum Seeker Resource Centre',
        value: 'Asylum Seeker Resource Centre',
      },
      { label: 'Other', value: 'Other' },
    ],
  },
  {
    name: 'HOUSING_SERVICE_REFERRER',
    askCondition: (data: Data) => data.REFERRER_TYPE == 'HOUSING_SERVICE',
    stage: 4,
    required: true,
    Prompt: <span>Which housing service referred you?</span>,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Launch Housing', value: 'Launch Housing' },
      { label: 'Quantum', value: 'Quantum' },
      { label: 'Women’s Housing', value: 'Women’s Housing' },
      { label: 'Rental and Housing Union', value: 'Rental and Housing Union' },
      { label: 'Better Renting', value: 'Better Renting' },
      { label: 'Tenants Victoria', value: 'Tenants Victoria' },
      { label: 'Other', value: 'Other' },
    ],
  },
  {
    name: 'CHARITY_REFERRER',
    askCondition: (data: Data) => data.REFERRER_TYPE == 'CHARITY',
    stage: 4,
    required: true,
    Prompt: <span>Which charity or non-profit referred you?</span>,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      {
        label: 'Ethic Communities Council of Victoria',
        value: 'Ethic Communities Council of Victoria',
      },
      { label: 'Jewish Care', value: 'Jewish Care' },
      { label: 'Sacred Heart Mission', value: 'Sacred Heart Mission' },
      { label: 'St Vincent De Paul', value: 'St Vincent De Paul' },
      { label: 'Tenants Victoria', value: 'Tenants Victoria' },
      { label: 'Other', value: 'Other' },
    ],
  },
  {
    name: 'SOCIAL_REFERRER',
    stage: 4,
    askCondition: (data: Data) => data.REFERRER_TYPE == 'SOCIAL_MEDIA',
    required: true,
    Prompt: <span>Which social media site did you find us on?</span>,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      {
        label: 'Facebook',
        value: 'Facebook',
      },
      { label: 'Instagram', value: 'Instagram' },
      { label: 'Twitter', value: 'Twitter' },
      { label: 'LinkedIn', value: 'LinkedIn' },
      { label: 'Pintrest', value: 'Pintrest' },
      { label: 'Reddit', value: 'Reddit' },
      { label: 'Other', value: 'Other' },
    ],
  },
]
