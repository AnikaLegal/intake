// @flow
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'
import type { Field, Form } from 'types'

export const HAS_CONTACTED_LANDLORD: Field = {
  name: 'HAS_CONTACTED_LANDLORD',
  prompt:
    'Have you contacted or attempted to contact your landlord (or your landlord’s agent) to ask them to fix the defect?',
  type: FIELD_TYPES.RADIO,
  rules: [rules.isTruthy],
  options: [
    {
      label:
        'Yes, I have contacted my landlord (or my landlord’s agent) and have asked them to fix the defect.',
      value: 'yes',
    },
    {
      label:
        'I have tried contacting my landlord (or my landlord’s agent) and have left a message for them.',
      value: 'attempted',
    },
    {
      label:
        'No, I have not yet made any attempts to contact my landlord or (or my landlord’s agent).',
      value: 'no',
    },
  ],
}

export const LANDLORD_CONTACT_METHOD: Field = {
  name: 'LANDLORD_CONTACT_METHOD',
  prompt: 'How did you contact your landlord (or your landlord’s agent)?',
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
    'When did you first contact or attempt to contact your landlord (or your landlord’s agent)?',
  type: FIELD_TYPES.DATE,
}

export const LANDLORD_CONTACT_ATTEMPTS: Field = {
  name: 'LANDLORD_CONTACT_ATTEMPTS',
  rules: [rules.isTruthy],
  prompt:
    'How many times have you contacted your landlord (or your landlord’s agent)?',
  help:
    'It doesn’t matter if you have contacted your landlord once or three times, it’s just helpful for us to know.',
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
    'Do you have records of your communications with your landlord (or your landlord’s agent) in which you asked for the defect to be fixed?',
  help:
    'Records could include emails or text messages you sent. It could also be the call log in your phone saying you called them on a certain day.',
  type: FIELD_TYPES.RADIO,
  options: [
    { label: 'Yes, I have records.', value: 'yes' },
    { label: 'No, I do not have any records.', value: 'no' },
  ],
}

export const LANDLORD_HAS_AGENT: Field = {
  name: 'LANDLORD_HAS_AGENT',
  rules: [rules.isTruthy],
  prompt: 'Does your landlord use an agent to manage the property?',
  type: FIELD_TYPES.RADIO_BTN,
  options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
}

export const LANDLORD_NAME = {
  name: 'LANDLORD_NAME',
  label: 'Full Name',
  rules: [rules.isTruthy],
  type: FIELD_TYPES.TEXT,
  placeholder: 'Enter their full name',
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
  prompt:
    'Please provide the details of your landlord or your landlord’s agent.',
  type: FIELD_TYPES.FIELD_GROUP,
  rules: [rules.isTruthy],
  fields: [LANDLORD_NAME, LANDLORD_EMAIL, LANDLORD_PHONE],
}

export const IS_VCAT_OK: Field = {
  name: 'IS_VCAT_OK',
  rules: [rules.isTruthy],
  prompt:
    'Sometimes the only way to force a landlord to fix defects is to commence VCAT proceedings against the landlord. Would you be comfortable bringing VCAT proceedings against your landlord?',
  help:
    'VCAT is a tribunal that hears and decides disputes between tenants and landlord. VCAT performs similar functions to a court, but is cheaper, faster and more informal than a court. A common reason why a tenant may not want to commence VCAT proceedings is they do not want to aggravate their relationship with their landlord because they are trying to secure an upcoming lease renewal.',
  type: FIELD_TYPES.RADIO_BTN,
  options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
}

export const VCAT_AVOID_REASON: Field = {
  name: 'VCAT_AVOID_REASON',
  rules: [rules.isTruthy],
  prompt:
    'Can you please explain why you wouldn’t be comfortable bringing VCAT proceedings against your landlord?',
  type: FIELD_TYPES.TEXTAREA,
}
