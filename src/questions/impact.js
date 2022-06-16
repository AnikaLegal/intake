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
    stage: 5,
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
    stage: 5,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: <span>What is your date of birth?</span>,
  },
  {
    name: 'GENDER',
    stage: 5,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Male', value: 'MALE' },
      { label: 'Female', value: 'FEMALE' },
      { label: 'Genderqueer or non-binary', value: 'GENDERQUEER' },
      { label: 'Prefer not to say', value: 'OMITTED' },
    ],
    placeholderText: 'Prefer to self-describe',
    Prompt: <span>What gender do you identify as?</span>,
  },
  {
    name: 'IS_ABORIGINAL_OR_TORRES_STRAIT_ISLANDER',
    stage: 5,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: (
      <span>
        You identify as an Aboriginal or Torres Strait Islander person
      </span>
    ),
  },
  {
    name: 'CAN_SPEAK_NON_ENGLISH',
    stage: 5,
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
    name: 'INTERPRETER',
    stage: 5,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    Prompt: <span>Do you need an interpreter?</span>,
    askCondition: (data) => data.CAN_SPEAK_NON_ENGLISH,
    choices: [
      { label: 'Yes', value: 'YES' },
      { label: 'No', value: 'NO' },
    ],
  },
  {
    name: 'FIRST_LANGUAGE',
    stage: 5,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: (
      <span>
        What is your <strong>preferred</strong> language other than English?
      </span>
    ),
    askCondition: (data) => data.CAN_SPEAK_NON_ENGLISH,
  },
  {
    name: 'WORK_OR_STUDY_CIRCUMSTANCES',
    stage: 5,
    required: true,
    Prompt: <span>Which best describes your work or study situation?</span>,
    type: FIELD_TYPES.CHOICE_SINGLE,
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
      { label: 'Full time parent', value: 'PARENT' },
      { label: 'Currently unemployed', value: 'UNEMPLOYED' },
      { label: 'Not looking for work', value: 'NOT_LOOKING_FOR_WORK' },
      { label: 'None of the above', value: null },
    ],
  },
  {
    name: 'REFERRER_TYPE',
    stage: 5,
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
    stage: 5,
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
    stage: 5,
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
    stage: 5,
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
    stage: 5,
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
