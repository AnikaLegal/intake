// @flow
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'
import * as Conditions from '../conditions'
import type { Field, Form } from 'types'

export const HAS_CONTACTED_LANDLORD: Field = {
  name: 'HAS_CONTACTED_LANDLORD',
  prompt:
    'Have you asked your landlord (or your landlord’s agent) to fix the problem?',
  type: FIELD_TYPES.RADIO,
  rules: [rules.isTruthy],
  options: [
    {
      label:
        'Yes, I have asked my landlord (or my landlord’s agent) to fix the problem.',
      value: 'yes',
    },
    {
      label:
        'No, I have not asked my landlord or (or my landlord’s agent) to fix the problem.',
      value: 'no',
    },
  ],
}

export const LANDLORD_CONTACT_METHOD: Field = {
  name: 'LANDLORD_CONTACT_METHOD',
  prompt:
    'How did you ask your landlord (or your landlord’s agent) to fix the problem?',
  type: FIELD_TYPES.MULTI_SELECT,
  rules: [rules.isTruthy],
  options: [
    { label: 'Phone', value: 'phone' },
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Letter', value: 'letter' },
    { label: 'In person', value: 'in person' },
  ],
}

export const LANDLORD_CONTACT_DATE: Field = {
  name: 'LANDLORD_CONTACT_DATE',
  rules: [rules.isTruthy],
  prompt:
    'When did you first ask your landlord (or your landlord’s agent) to fix the problem?',
  type: FIELD_TYPES.DATE,
}

export const LANDLORD_CONTACT_ATTEMPTS: Field = {
  name: 'LANDLORD_CONTACT_ATTEMPTS',
  rules: [rules.isTruthy],
  prompt:
    'How many times have you asked your landlord (or your landlord’s agent) to fix the problem?',
  help:
    'It doesn’t matter if you have asked your landlord once or three times, it’s just helpful for us to know.',
  type: FIELD_TYPES.RADIO,
  options: [
    { label: 'Once', value: '1' },
    { label: 'Twice', value: '2' },
    { label: 'Three times', value: '3' },
    { label: 'More than three', value: '>3' },
  ],
}

export const LANDLORD_CONTACT_RECORDS: Field = {
  name: 'LANDLORD_CONTACT_RECORDS',
  rules: [rules.isTruthy],
  prompt:
    'Do you have proof that you asked your landlord (or your landlord’s agent) to fix the problem?',
  help:
    "Proof can include emails, text messages or letters that you sent to your landlord (or your landlord's agent).",
  type: FIELD_TYPES.RADIO,
  options: [
    { label: 'Yes, I have proof.', value: 'yes' },
    { label: "No, I don't have proof.", value: 'no' },
  ],
}

export const LANDLORD_NAME = {
  name: 'LANDLORD_NAME',
  label: 'Full name',
  rules: [rules.isTruthy],
  type: FIELD_TYPES.TEXT,
  placeholder: 'Enter their full name',
}

export const LANDLORD_ADDRESS = {
  name: 'LANDLORD_ADDRESS',
  label: 'Address',
  rules: [rules.isTruthy],
  type: FIELD_TYPES.TEXT,
  placeholder: 'Enter their address',
}

export const LANDLORD_EMAIL: Field = {
  name: 'LANDLORD_EMAIL',
  type: FIELD_TYPES.TEXT,
  rules: [rules.isTruthy],
  label: 'Email',
  placeholder: 'Enter their email address',
}

export const LANDLORD_PHONE: Field = {
  name: 'LANDLORD_PHONE',
  type: FIELD_TYPES.TEXT,
  label: 'Phone',
  rules: [rules.isTruthy],
  placeholder: 'Enter their phone number',
}

export const LANDLORD_CONTACT_DETAILS: Field = {
  name: 'LANDLORD_CONTACT_DETAILS',
  prompt: 'Please provide the contact details of your landlord.',
  type: FIELD_TYPES.FIELD_GROUP,
  rules: [],
  fields: [LANDLORD_NAME, LANDLORD_ADDRESS, LANDLORD_EMAIL, LANDLORD_PHONE],
}

export const LANDLORD_HAS_AGENT: Field = {
  name: 'LANDLORD_HAS_AGENT',
  rules: [rules.isTruthy],
  prompt: 'Does your landlord use an agent to manage the property?',
  help:
    'If your landlord uses an agent to manage the property, then you will have received letters or communication from the agent already.',
  type: FIELD_TYPES.RADIO_BTN,
  options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
}

export const AGENT_NAME = {
  name: 'AGENT_NAME',
  label: 'Full name',
  rules: [rules.isTruthy],
  type: FIELD_TYPES.TEXT,
  placeholder: 'Enter their full name',
}

export const AGENT_ADDRESS = {
  name: 'AGENT_ADDRESS',
  label: 'Address',
  rules: [rules.isTruthy],
  type: FIELD_TYPES.TEXT,
  placeholder: 'Enter their address',
}

export const AGENT_EMAIL: Field = {
  name: 'AGENT_EMAIL',
  type: FIELD_TYPES.TEXT,
  rules: [rules.isTruthy],
  label: 'Email',
  placeholder: 'Enter their email address',
}

export const AGENT_PHONE: Field = {
  name: 'AGENT_PHONE',
  type: FIELD_TYPES.TEXT,
  label: 'Phone',
  rules: [rules.isTruthy],
  placeholder: 'Enter their phone number',
}

export const AGENT_CONTACT_DETAILS: Field = {
  name: 'AGENT_CONTACT_DETAILS',
  prompt: "Please provide the contact details of your landlord's agent.",
  type: FIELD_TYPES.FIELD_GROUP,
  when: Conditions.HAS_AGENT,
  rules: [],
  fields: [AGENT_NAME, AGENT_ADDRESS, AGENT_EMAIL, AGENT_PHONE],
}
