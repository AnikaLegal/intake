// @flow
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'
import * as Conditions from '../conditions'
import type { Field, Form } from 'types'

export const LETTER_PERMISSION: Field = {
  rules: [rules.isTruthy],
  name: 'LETTER_PERMISSION',
  prompt:
    'If a letter needs to be sent to your landlord, would you prefer the letter to be sent by a lawyer or by yourself?',
  help:
    'Letters sent from a lawyer will place more pressure on the landlord. Letters sent personally by you will be more "gentle" because lawyers are not involved.',
  type: FIELD_TYPES.RADIO_BTN,
  options: [
    {
      label: 'Lawyer',
      value: 'lawyer',
    },
    {
      label: 'Myself',
      value: 'myself',
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

export const CLIENT_BREACHED_LEASE: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_BREACHED_LEASE',
  prompt: 'Have you recently breached your lease?',
  help:
    'Breaches may include not paying rent on time or sub-letting the premises to a friend without your landlord’s consent. We will keep your answer strictly confidential and won’t tell your landlord. Telling us this information will help us to determine the most appropriate course of action for you to take.',
  type: FIELD_TYPES.RADIO_BTN,
  options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
}

export const CLIENT_CALL_TIME = {
  rules: [rules.isTruthy],
  name: 'CLIENT_CALL_TIME',
  prompt: 'When is your preferred time for us to call you?',
  help:
    'One of our friendly team members will call you to introduce themselves and to discuss how we can help you.',
  type: FIELD_TYPES.RADIO,
  options: [
    {
      label: 'Monday – Friday (between 9am and 5pm)',
      value: 'Monday – Friday (between 9am and 5pm)',
    },
    {
      label: 'Monday – Friday (between 5pm and 8pm)',
      value: 'Monday – Friday (between 5pm and 8pm)',
    },
    {
      label: 'Saturday (between 9am and 5pm)',
      value: 'Saturday (between 9am and 5pm)',
    },
    {
      label: 'Sunday (between 9am and 5pm)',
      value: 'Sunday (between 9am and 5pm)',
    },
  ],
}

export const IS_VCAT_OK: Field = {
  name: 'IS_VCAT_OK',
  rules: [rules.isTruthy],
  prompt:
    'Would you be willing to go to VCAT to force your landlord to fix the problem?',
  help:
    'VCAT is the tribunal that hears and decides disputes between tenants and landlords. VCAT is similar to a court, but it is quick, informal, it is usually free and you don’t need a lawyer to speak for you. The only way to force your landlord to perform repairs is to bring a case against them at VCAT.',
  type: FIELD_TYPES.RADIO,
  options: [
    { label: 'Yes, as soon as possible', value: 'As soon as possible' },
    { label: 'Yes, but only as a last resort', value: 'As a last resort only' },
    { label: 'No', value: 'no' },
  ],
}

export const VCAT_AVOID_REASON: Field = {
  name: 'VCAT_AVOID_REASON',
  rules: [rules.isTruthy],
  when: Conditions.VCAT_NOT_OK,
  prompt:
    'Can you please explain why you would prefer not to bring a case against your landlord at VCAT?',
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
  type: FIELD_TYPES.MULTI_SELECT,
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
      label: 'I am living in public housing',
      value: 'Is living in public housing',
    },
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

export const TENANCY_START_DATE: Field = {
  rules: [rules.isTruthy],
  name: 'TENANCY_START_DATE',
  prompt: 'When did you start living at the rental property?',
  help:
    "If you don't know the exact date, that's okay. An approximate date is fine.",
  type: FIELD_TYPES.DATE,
}

export const CLIENT_IS_TENANT: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_IS_TENANT',
  prompt: 'Are you named as a tenant on the lease?',
  help: "It's likely that you are named as a tenant if you signed the lease.",
  type: FIELD_TYPES.RADIO_BTN,
  options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
}
