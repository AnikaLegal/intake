//@flow
import * as React from 'react'

import { FIELD_TYPES, ROUTES, LINKS } from 'consts'
import { events } from 'analytics'
import { api } from 'api'
import { storeFormData } from 'utils'
import type { Field, Data } from 'types'

export const PREFERENCE_QUESTIONS: Array<Field> = [
  {
    name: 'CONTACT_INTRO',
    stage: 3,
    required: true,
    type: FIELD_TYPES.DISPLAY,
    effect: async (data: Data) => {
      events.onLandlordDetailsComplete()
    },
    Prompt: (
      <span>
        Great job. That is all the questions we have about your property. Now we
        just need a few details about you.
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
    name: 'SUBURB',
    stage: 3,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What suburb do you live in?</span>,
  },
  {
    name: 'POSTCODE',
    stage: 3,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your post code?</span>,
  },
  {
    name: 'ADDRESS',
    stage: 3,
    required: true,
    type: FIELD_TYPES.TEXT,
    Prompt: <span>What is your street address?</span>,
  },
  {
    name: 'DOB',
    stage: 3,
    required: true,
    type: FIELD_TYPES.DATE,
    Prompt: <span>What is your date of birth?</span>,
  },
  {
    name: 'GENDER',
    stage: 3,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Self-described', value: 'other' },
      { label: 'Prefer not to say', value: 'omitted' },
    ],
    Prompt: <span>What gender do you identify as?</span>,
  },
  {
    name: 'GENDER_DETAILS',
    stage: 3,
    required: true,
    askCondition: (data: Data) => data.GENDER == 'other',
    type: FIELD_TYPES.TEXT,
    Prompt: <span>Please describe your gender.</span>,
  },
  {
    name: 'IS_ABORIGINAL_OR_TORRES_STRAIT_ISLANDER',
    stage: 3,
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
    stage: 3,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
    Prompt: <span>Do you speak a language other than English?</span>,
  },
  {
    name: 'WORK_OR_STUDY_CIRCUMSTANCES',
    stage: 3,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      {
        label: 'Income reduced due to COVID-19',
        value: 'INCOME_REDUCED_COVID',
      },
      { label: 'Student', value: 'STUDENT' },
      { label: 'Apprentice or trainee', value: 'APPRENTICE' },
      { label: 'Looking for work', value: 'LOOKING_FOR_WORK' },
      { label: 'Working full time', value: 'WORKING_FULL_TIME' },
      {
        label: 'Working part time or casually',
        value: 'WORKING_PART_TIME',
      },
      { label: 'Retired', value: 'RETIRED' },
      { label: 'None of the above', value: null },
    ],
    Prompt: <span>Which best describes your work or study circumstances?</span>,
  },

  {
    name: 'SPECIAL_CIRCUMSTANCES',
    stage: 3,
    required: false,
    type: FIELD_TYPES.CHOICE_MULTI,
    choices: [
      {
        label:
          'I am currently experiencing/fleeing or am at risk of experiencing family violence',
        value: 'FAMILY_VIOLENCE',
      },
      {
        label:
          'I have a long-term health condition or a disability affects my participation at work or education',
        value: 'HEALTH_CONDITION',
      },
      {
        label: 'I have a refugee or an asylum seeker status',
        value: 'REFUGEE',
      },
      {
        label:
          'I have a Health Care Card or Pensioner Concession Card and an eligible Centrelink payment',
        value: 'CENTRELINK',
      },
      {
        label: 'I am a single parent',
        value: 'SINGLE_PARENT',
      },
    ],
    Prompt: (
      <span>Do any of following special circumstances apply to you?</span>
    ),
  },
  {
    name: 'WEEKLY_INCOME',
    stage: 3,
    required: true,
    type: FIELD_TYPES.NUMBER,
    Prompt: <span>What is your weekly income?</span>,
    Help: (
      <span>
        Due to our charity status we are only able to help clients who fall
        within a certain income brackets. This information will be kept private.
      </span>
    ),
  },
  {
    name: 'WELFARE_RELIANCE',
    stage: 3,
    required: true,
    type: FIELD_TYPES.CHOICE_SINGLE,
    choices: [
      { label: 'No reliance', value: 'NO_RELIANCE' },
      {
        label: 'Less than 50% of my income',
        value: 'SOMEWHAT_RELIANT',
      },
      { label: 'More than 50% of my income', value: 'RELIANT' },
    ],
    Prompt: (
      <span>
        Thinking about how much welfare you receive, how would you describe your
        reliance on welfare?
      </span>
    ),
    Help: (
      <span>
        Welfare includes payments from Centrelink/NEIS, Disability Pension,
        Family Allowance.
      </span>
    ),
  },

  {
    name: 'PHONE',
    stage: 3,
    required: true,
    type: FIELD_TYPES.PHONE,
    Prompt: <span>What is the best phone number to contact you on?</span>,
  },
  {
    name: 'AVAILIBILITY',
    stage: 3,
    required: true,
    type: FIELD_TYPES.CHOICE_MULTI,
    choices: [
      { label: 'Weekdays (9am to 5pm)', value: 'WEEK_DAY' },
      { label: 'Weekdays (5pm to 8pm)', value: 'WEEK_EVENING' },
      { label: 'Saturday (9am to 5pm)', value: 'SATURDAY' },
      { label: 'Sunday (9am to 5pm)', value: 'SUNDAY' },
    ],
    Prompt: <span>When is your preferred time for us to call you?</span>,
  },
  {
    name: 'REFERRER_TYPE',
    stage: 3,
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
    ],
  },
  {
    name: 'LEGAL_CENTER_REFERRER',
    stage: 3,
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
    stage: 3,
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
    stage: 3,
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
    stage: 3,
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
