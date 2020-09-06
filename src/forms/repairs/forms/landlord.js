//@flow
// Forms where we collect landlord and owner details.
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'

import * as Conditions from '../conditions'
import type { Field, Form } from 'types'

const HAS_CONTACTED_LANDLORD: Field = {
  name: 'HAS_CONTACTED_LANDLORD',
  displayName: 'You have asked your landlord to fix the problem',
  prompt:
    'Have you asked your landlord (or your landlord’s agent) to fix the problem?',
  type: FIELD_TYPES.RADIO_BTN,
  rules: [rules.isTruthy],
  options: [
    {
      label: 'Yes',
      value: 'yes',
    },
    {
      label: 'No',
      value: 'no',
    },
  ],
}

const LANDLORD_CONTACT_METHOD: Field = {
  name: 'LANDLORD_CONTACT_METHOD',
  displayName: 'How you asked your landlord to fix the problem',
  prompt:
    'How did you ask your landlord (or your landlord’s agent) to fix the problem?',
  help:
    "You can select more than one option. If none apply, please select 'Other'",
  type: FIELD_TYPES.MULTI_DROPDOWN,
  rules: [rules.isTruthy],
  options: [
    { label: 'Phone', value: 'phone' },
    { label: 'Email', value: 'email' },
    { label: 'Text message', value: 'text message' },
    { label: 'Letter', value: 'letter' },
    { label: 'In person', value: 'in person' },
    { label: 'Other', value: 'other' },
  ],
}

const LANDLORD_CONTACT_DATE: Field = {
  name: 'LANDLORD_CONTACT_DATE',
  rules: [rules.isTruthy],
  displayName: 'When you first asked your landlord to fix the problem',
  prompt:
    'When did you first ask your landlord (or your landlord’s agent) to fix the problem?',
  type: FIELD_TYPES.DATE,
}

const LANDLORD_CONTACT_ATTEMPTS: Field = {
  name: 'LANDLORD_CONTACT_ATTEMPTS',
  rules: [rules.isTruthy],
  displayName: 'The number of times you asked your landlord to fix the problem',
  prompt:
    'How many times have you asked your landlord (or your landlord’s agent) to fix the problem?',
  help:
    'It doesn’t matter how many times you have asked, it’s just helpful for us to know.',
  type: FIELD_TYPES.DROPDOWN,
  options: [
    { label: 'Once', value: '1' },
    { label: 'Twice', value: '2' },
    { label: 'Three times', value: '3' },
    { label: 'More than three', value: '>3' },
  ],
}

const LANDLORD_CONTACT_RECORDS: Field = {
  name: 'LANDLORD_CONTACT_RECORDS',
  rules: [rules.isTruthy],
  displayName: 'You have proof that you asked your landlord to fix the problem',
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

const LANDLORD_NAME: Field = {
  name: 'LANDLORD_NAME',
  displayName: "Your landlord's name",
  prompt: 'Full name',
  rules: [rules.isTruthy],
  type: FIELD_TYPES.TEXT,
  placeholder: 'Enter their full name',
}

const LANDLORD_ADDRESS: Field = {
  name: 'LANDLORD_ADDRESS',
  displayName: "Your landlord's address",
  prompt: 'Address',
  rules: [],
  type: FIELD_TYPES.TEXT,
  placeholder: 'Enter their address',
}

const LANDLORD_EMAIL: Field = {
  name: 'LANDLORD_EMAIL',
  type: FIELD_TYPES.TEXT,
  displayName: "Your landlord's email",

  rules: [rules.isTruthy],
  prompt: 'Email',
  placeholder: 'Enter their email address',
}

const LANDLORD_PHONE: Field = {
  name: 'LANDLORD_PHONE',
  type: FIELD_TYPES.TEXT,
  displayName: "Your landlord's phone",

  prompt: 'Phone',
  rules: [],
  placeholder: 'Enter their phone number',
}

const LANDLORD_CONTACT_DETAILS: Field = {
  name: 'LANDLORD_CONTACT_DETAILS',
  displayName: null,
  prompt: 'Please provide the contact details of your landlord.',
  help:
    "Your landlord's name will be on your lease agreement. It may be a the name of a person or a company. ",
  type: FIELD_TYPES.FIELD_GROUP,
  rules: [],
  when: Conditions.NOT_HAS_AGENT,
  fields: [LANDLORD_NAME, LANDLORD_ADDRESS, LANDLORD_EMAIL, LANDLORD_PHONE],
}

const LANDLORD_CONTACT_DETAILS_WHEN_AGENT: Field = {
  name: 'LANDLORD_CONTACT_DETAILS',
  displayName: null,
  prompt: 'Please provide the contact details of your landlord.',
  help:
    "Your landlord's name will be on your lease agreement. It may be a the name of a person or a company. ",
  type: FIELD_TYPES.FIELD_GROUP,
  rules: [],
  when: Conditions.HAS_AGENT,
  fields: [LANDLORD_NAME],
}

const LANDLORD_HAS_AGENT: Field = {
  name: 'LANDLORD_HAS_AGENT',
  rules: [rules.isTruthy],
  displayName: 'Your landlord uses an agent',
  prompt: 'Does your landlord use an agent to manage the property?',
  help:
    'If your landlord uses an agent to manage the property, then you will have received letters or communications from the agent already.',
  type: FIELD_TYPES.RADIO_BTN,
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ],
}

const AGENT_NAME: Field = {
  name: 'AGENT_NAME',
  prompt: 'Full name',
  displayName: "Your agent's name",

  rules: [rules.isTruthy],
  type: FIELD_TYPES.TEXT,
  placeholder: 'Enter their full name',
}

const AGENT_COMPANY: Field = {
  name: 'AGENT_COMPANY',
  prompt: 'Company',
  displayName: "Your agent's company",

  rules: [rules.isTruthy],
  type: FIELD_TYPES.TEXT,
  placeholder: "Enter the name of the agent's company",
}

const AGENT_ADDRESS: Field = {
  name: 'AGENT_ADDRESS',
  displayName: "Your agent's address",

  prompt: 'Address',
  rules: [],
  type: FIELD_TYPES.TEXT,
  placeholder: 'Enter their address',
}

const AGENT_EMAIL: Field = {
  name: 'AGENT_EMAIL',
  displayName: "Your agent's email",

  type: FIELD_TYPES.TEXT,
  rules: [rules.isTruthy],
  prompt: 'Email',
  placeholder: 'Enter their email address',
}

const AGENT_PHONE: Field = {
  name: 'AGENT_PHONE',
  displayName: "Your agent's phone",

  type: FIELD_TYPES.TEXT,
  prompt: 'Phone',
  rules: [],
  placeholder: 'Enter their phone number',
}

const AGENT_CONTACT_DETAILS: Field = {
  name: 'AGENT_CONTACT_DETAILS',
  displayName: null,
  prompt: "Please provide the contact details of your landlord's agent.",
  help:
    "We don't need all of your agent's details. If you don't have some of this information, you can leave the fields blank.",
  type: FIELD_TYPES.FIELD_GROUP,
  when: Conditions.HAS_AGENT,
  rules: [],
  fields: [AGENT_NAME, AGENT_COMPANY, AGENT_ADDRESS, AGENT_EMAIL, AGENT_PHONE],
}

export const LANDLORD_COMMS_CHECK: Form = {
  name: 'LANDLORD_COMMS_CHECK',
  prompt: 'Your communications with your landlord',
  fields: [HAS_CONTACTED_LANDLORD],

  getRedirect: data =>
    data['HAS_CONTACTED_LANDLORD'] === 'no' ? 'ContactLandlordView' : null,
}

export const LANDLORD_COMMS_DETAILS: Form = {
  name: 'LANDLORD_COMMS_DETAILS',
  prompt: 'Your communications with your landlord',
  fields: [
    LANDLORD_CONTACT_METHOD,
    LANDLORD_CONTACT_DATE,
    LANDLORD_CONTACT_ATTEMPTS,
    LANDLORD_CONTACT_RECORDS,
  ],
}

export const LANDLORD_CONTACT: Form = {
  name: 'LANDLORD_CONTACT',
  prompt: "Your landlord's contact details",
  fields: [
    LANDLORD_HAS_AGENT,
    LANDLORD_CONTACT_DETAILS,
    LANDLORD_CONTACT_DETAILS_WHEN_AGENT,
    AGENT_CONTACT_DETAILS,
  ],
}
