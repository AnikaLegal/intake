//@flow
// Form where we collect generic client survey data.
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'

import * as Conditions from '../conditions'
import type { Field, Form } from 'types'

const CLIENT_OCCUPATION: Field = {
  name: 'CLIENT_OCCUPATION',
  rules: [],
  prompt: 'What is your occupation?',
  type: FIELD_TYPES.TEXT,
}
const CLIENT_WEEKLY_EARNINGS: Field = {
  name: 'CLIENT_WEEKLY_EARNINGS',
  rules: [rules.isTruthy],
  prompt: 'How much money do you earn per week (on average)?',
  type: FIELD_TYPES.DOLLAR,
}
const CLIENT_SPECIAL_CIRCUMSTANCES: Field = {
  name: 'CLIENT_SPECIAL_CIRCUMSTANCES',
  rules: [],
  prompt: 'Do you have any special circumstances?',
  type: FIELD_TYPES.MULTI_SELECT,
  options: [
    { label: 'I have a physical disability', value: 'Physical disability' },
    {
      label: 'I am unable to travel to a legal centre',
      value: "Can't get to a legal centre",
    },
    { label: 'I am a single parent', value: 'Is a single parent' },
    {
      label: 'I am living in public housing',
      value: 'Is living in public housing',
    },
    {
      label: 'I am from a migrant or refugee background',
      value: 'Is migrant or refugee',
    },
    {
      label: 'I have a mental illness or intellectual disability',
      value: 'Has mental illness or intellectual disability',
    },
    {
      label: 'I am from an Aboriginal or Torres Strait Islander background',
      value: 'Is from an Aboriginal or Torres Strait Islander background',
    },

    {
      label:
        'I have another personal circumstance that I want Anika to know about',
      value: 'other',
    },
  ],
}
const CLIENT_SPECIAL_CIRCUMSTANCES_DETAILS: Field = {
  name: 'CLIENT_SPECIAL_CIRCUMSTANCES_DETAILS',
  rules: [],
  prompt:
    'Tell us about the other personal circumstance that makes you disadvantaged or vulnerable',
  type: FIELD_TYPES.TEXTAREA,
  when: Conditions.HAS_OTHER_SPECIAL_CIRCUMSTANCE,
}

const CLIENT_REFERRAL: Field = {
  rules: [],
  name: 'CLIENT_REFERRAL',
  type: FIELD_TYPES.DROPDOWN,
  prompt: 'How did you hear about Anika?',
  options: [
    { label: 'Facebook', value: 'Facebook' },
    { label: 'Instagram', value: 'Instagram' },
    { label: 'Google', value: 'Google' },
    { label: 'Flyer', value: 'Flyer' },
    { label: 'Word of mouth', value: 'Word of mouth' },
    { label: 'Referral from a charity', value: 'Charity' },
    {
      label: 'Referral from a legal centre',
      value: 'Legal centre',
    },
    { label: 'Other', value: 'Other' },
  ],
}

const CLIENT_REFERRAL_CHARITY: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_REFERRAL_CHARITY',
  type: FIELD_TYPES.TEXT,
  prompt: 'What was the name of the charity that referred you?',
  when: Conditions.WAS_REFERRED_CHARITY,
}

const CLIENT_REFERRAL_LEGAL_CENTRE: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_REFERRAL_LEGAL_CENTRE',
  type: FIELD_TYPES.TEXT,
  prompt: 'What was the name of the legal center that referred you?',
  when: Conditions.WAS_REFERRED_LEGAL_CENTRE,
}

const CLIENT_REFERRAL_OTHER: Field = {
  rules: [],
  name: 'CLIENT_REFERRAL_OTHER',
  type: FIELD_TYPES.TEXT,
  prompt: 'Can you tell us more about how you hear about us?',
  when: Conditions.WAS_REFERRED_OTHER,
}

export const SURVEY: Form = {
  name: 'SURVEY',
  prompt: 'We want to understand our clients better',
  help:
    'So we can understand our clients better and provide the best form of assistance, we need to ask you a few more questions. We understand there may besome sensitivity around your answers. We will ensure that your answers are stored privately and securely.',
  fields: [
    CLIENT_OCCUPATION,
    CLIENT_WEEKLY_EARNINGS,
    CLIENT_SPECIAL_CIRCUMSTANCES,
    CLIENT_SPECIAL_CIRCUMSTANCES_DETAILS,
    CLIENT_REFERRAL,
    CLIENT_REFERRAL_CHARITY,
    CLIENT_REFERRAL_LEGAL_CENTRE,
    CLIENT_REFERRAL_OTHER,
  ],
}
