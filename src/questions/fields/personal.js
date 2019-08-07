// @flow
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'
import * as Conditions from '../conditions'
import type { Field, Form } from 'types'

export const LETTER_PERMISSION: Field = {
  rules: [rules.isTruthy],
  name: 'LETTER_PERMISSION',
  prompt:
    'If a letter needs to be sent to your landlord, would you prefer Anika to sign and send that letter to you landlord or would you prefer Anika to prepare the letter for you to personally sign and send to landlord?',
  help:
    'Letters sent from Anika will place more pressure on the landlord because they will notify the landlord that you have engaged legal advisors to act for you. Letters that are sent personally by you to the landlord will be more "gentle" because legal advisors are not involved.',
  type: FIELD_TYPES.RADIO,
  options: [
    {
      label:
        'I would prefer Anika to sign and send any letters to my landlord.',
      value: 'anika',
    },
    {
      label:
        'I would prefer Anika to prepare the letters, but I want to personally sign and send them to my landlord',
      value: 'personal',
    },
  ],
}

export const CLIENT_NAME: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_NAME',
  prompt: 'Full name',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Full name',
}

export const CLIENT_ADDRESS: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_RENTAL_ADDRESS',
  prompt: 'Address',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Your rental address',
}

export const CLIENT_EMAIL: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_EMAIL',
  prompt: 'Email',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Email address',
}

export const CLIENT_DOB: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_DOB',
  prompt: 'Birth Date',
  type: FIELD_TYPES.DATE,
}

export const CLIENT_PHONE: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_PHONE',
  prompt: 'Phone',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Phone number',
}

export const CLIENT_CONTACT_DETAILS: Field = {
  rules: [],
  name: 'CLIENT_CONTACT_DETAILS',
  prompt: 'Please provide your contact details.',
  type: FIELD_TYPES.FIELD_GROUP,
  fields: [CLIENT_NAME, CLIENT_ADDRESS, CLIENT_DOB, CLIENT_EMAIL, CLIENT_PHONE],
}

export const CLIENT_CONTACT_METHOD: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_CONTACT_METHOD',
  prompt: 'How would you like to be contacted?',
  type: FIELD_TYPES.RADIO,
  options: [
    { label: 'Phone and email (we prefer this)', value: 'phone and email' },
    { label: 'Email', value: 'email' },
  ],
}

export const IS_VCAT_OK: Field = {
  name: 'IS_VCAT_OK',
  rules: [rules.isTruthy],
  prompt:
    'Would you be willing to bring a case against your landlord at VCAT in order to get your landlord to fix the problem?',
  help:
    'VCAT is the tribunal that hears and decides disputes between tenants and landlords. VCAT is similar to a court, but it is much cheaper, faster, less formal and you don’t need a lawyer to speak for you. Sometimes the only way to force a landlord to perform repairs is to bring a case against them at VCAT. A common reason why tenants would not want to bring a case against their landlord at VCAT is because they are scared their landlord will become angry and try to evict them.',
  type: FIELD_TYPES.RADIO_BTN,
  options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
}

export const VCAT_AVOID_REASON: Field = {
  name: 'VCAT_AVOID_REASON',
  rules: [rules.isTruthy],
  when: Conditions.VCAT_NOT_OK,
  prompt:
    'Can you please explain why you wouldn’t be comfortable bringing a case against your landlord at VCAT?',
  type: FIELD_TYPES.TEXTAREA,
}

export const CLIENT_OCCUPATION: Field = {
  name: 'CLIENT_OCCUPATION',
  rules: [],
  prompt: 'What is your occupation?',
  type: FIELD_TYPES.TEXT,
}
export const CLIENT_WEEKLY_EARNINGS: Field = {
  name: 'CLIENT_WEEKLY_EARNINGS',
  rules: [],
  prompt: 'How much money do you earn per week (on average)?',
  type: FIELD_TYPES.DOLLAR,
}
export const CLIENT_SPECIAL_CIRCUMSTANCES: Field = {
  name: 'CLIENT_SPECIAL_CIRCUMSTANCES',
  rules: [],
  prompt: 'Do you have any special circumstances?',
  type: FIELD_TYPES.RADIO,
  options: [
    {
      label: 'I am not comfortable communicating in English',
      value: 'Not comfortable with English',
    },
    { label: 'I have a physical disability', value: 'Physical disability' },
    {
      label: 'I am unable to travel to a legal centre',
      value: "Can't get to a legal centre",
    },
    { label: 'I have children', value: 'Has children' },
    {
      label:
        'I have another personal circumstance that I want Anika to know about',
      value: 'other',
    },
  ],
}
export const CLIENT_SPECIAL_CIRCUMSTANCES_DETAILS: Field = {
  name: 'CLIENT_SPECIAL_CIRCUMSTANCES_DETAILS',
  rules: [],
  prompt: 'Tell us about the other personal circumstance',
  type: FIELD_TYPES.TEXTAREA,
  when: Conditions.HAS_OTHER_SPECIAL_CIRCUMSTANCE,
}

export const CLIENT_REFERRAL: Field = {
  rules: [],
  name: 'CLIENT_REFERRAL',
  type: FIELD_TYPES.TEXTAREA,
  prompt: 'How did you hear about Anika?',
}
