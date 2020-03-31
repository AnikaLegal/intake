//@flow
// Form where we collect client personal details.
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'

import * as Conditions from '../conditions'
import type { Field, Form } from 'types'

const CLIENT_NAME: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_NAME',
  prompt: 'Full name',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Full name',
}

const CLIENT_ADDRESS: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_RENTAL_ADDRESS',
  prompt: 'Address',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Your rental address',
}

const CLIENT_EMAIL: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_EMAIL',
  prompt: 'Email',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Email address',
}

const CLIENT_DOB: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_DOB',
  prompt: 'Birth Date',
  type: FIELD_TYPES.DATE,
}

const CLIENT_PHONE: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_PHONE',
  prompt: 'Phone',
  type: FIELD_TYPES.TEXT,
  placeholder: 'Phone number',
}

const CLIENT_CONTACT_DETAILS: Field = {
  rules: [],
  name: 'CLIENT_CONTACT_DETAILS',
  prompt: 'Please provide your contact details.',
  type: FIELD_TYPES.FIELD_GROUP,
  fields: [CLIENT_NAME, CLIENT_ADDRESS, CLIENT_DOB, CLIENT_EMAIL, CLIENT_PHONE],
}

export const PERSONAL_DETAILS: Form = {
  name: 'PERSONAL_DETAILS',
  prompt: 'Your contact details',
  fields: [CLIENT_CONTACT_DETAILS],
}
