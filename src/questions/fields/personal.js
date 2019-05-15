// @flow
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'
import type { Field, Form } from 'types'

const LETTER_PERMISSION: Field = {
  name: 'LETTER_PERMISSION',
  prompt:
    'If any letters or notices need to be sent to your landlord, would you prefer Anika to send those letters or notices to you landlord or would you prefer Anika to prepare the letters or notices for you to send to landlord?',
  help:
    'Letters sent from Anika will place more pressure on the landlord because they will notify the landlord that you have engaged legal advisors to act for you. Letters that are sent personally by you to the landlord will be more "gentle" because legal advisors are not involved.',
  type: FIELD_TYPES.RADIO,
  options: [
    {
      label:
        'I would prefer Anika to send any letters or notices to my landlord.',
      value: 'anika',
    },
    {
      label:
        'I would prefer Anika to prepare the letters or notices so that I can personally send them to my landlord',
      value: 'personal',
    },
  ],
}

const CLIENT_NAME: Field = {
  name: 'CLIENT_NAME',
  label: 'Full name',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Full name',
}

const CLIENT_RENTAL_ADDRESS: Field = {
  name: 'CLIENT_RENTAL_ADDRESS',
  label: 'Rental Addr',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Address of rental property in issue',
}

const CLIENT_PERSONAL_ADDRESS: Field = {
  name: 'CLIENT_PERSONAL_ADDRESS',
  label: 'Personal Addr',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Personal address',
}

const CLIENT_EMAIL: Field = {
  name: 'CLIENT_EMAIL',
  label: 'Email',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Email address',
}

const CLIENT_BUSINESS_PHONE: Field = {
  name: 'CLIENT_BUSINESS_PHONE',
  label: 'Phone (Day)',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Phone number (business hours)',
}

const CLIENT_EVENING_PHONE: Field = {
  name: 'CLIENT_EVENING_PHONE',
  type: FIELD_TYPES.TEXT,
  label: 'Phone (Evening)',
  placeholder: 'Phone number (outside business hours)',
}

const CLIENT_CONTACT_DETAILS: Field = {
  name: 'CLIENT_CONTACT_DETAILS',
  prompt: 'Please provide your contact details.',
  type: FIELD_TYPES.FIELD_GROUP,
  fields: [
    CLIENT_NAME,
    CLIENT_RENTAL_ADDRESS,
    CLIENT_PERSONAL_ADDRESS,
    CLIENT_EMAIL,
    CLIENT_BUSINESS_PHONE,
    CLIENT_EVENING_PHONE,
  ],
}

const CLIENT_CONTACT_METHOD: Field = {
  name: 'CLIENT_CONTACT_METHOD',
  prompt: 'How would you like to be contacted?',
  type: FIELD_TYPES.RADIO,
  options: [
    { label: 'Phone and email (we prefer this)', value: 'phone and email' },
    { label: 'Email only', value: 'email' },
  ],
}

const CLIENT_REFERRAL: Field = {
  name: 'CLIENT_REFERRAL',
  type: FIELD_TYPES.TEXTAREA,
  prompt: 'How did you hear about Anika?',
}

export const PERSONAL_DETAILS_FORM: Form = {
  name: 'PERSONAL_DETAILS_FORM',
  prompt: 'We need to know more about you',
  fields: [CLIENT_CONTACT_DETAILS],
  validations: {
    CLIENT_NAME: [rules.isTruthy],
    CLIENT_RENTAL_ADDRESS: [rules.isTruthy],
    CLIENT_PERSONAL_ADDRESS: [rules.isTruthy],
    CLIENT_EMAIL: [rules.isTruthy],
    CLIENT_BUSINESS_PHONE: [rules.isTruthy],
    CLIENT_EVENING_PHONE: [rules.isTruthy],
  },
}

export const PERSONAL_PREFERENCES_FORM: Form = {
  name: 'PERSONAL_PREFERENCES_FORM',
  prompt: 'Tell us what you prefer',
  fields: [LETTER_PERMISSION, CLIENT_CONTACT_METHOD, CLIENT_REFERRAL],
  validations: {
    LETTER_PERMISSION: [rules.isTruthy],
    CLIENT_CONTACT_METHOD: [rules.isTruthy],
    CLIENT_REFERRAL: [],
  },
}
