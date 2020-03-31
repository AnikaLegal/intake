//@flow
// Forms where we collect landlord and owner details.
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'

import * as Conditions from '../conditions'
import type { Field, Form } from 'types'

const LANDLORD_NAME: Field = {
  name: 'LANDLORD_NAME',
  prompt: 'Full name',
  rules: [rules.isTruthy],
  type: FIELD_TYPES.TEXT,
  placeholder: 'Enter their full name',
}

const LANDLORD_ADDRESS: Field = {
  name: 'LANDLORD_ADDRESS',
  prompt: 'Address',
  rules: [],
  type: FIELD_TYPES.TEXT,
  placeholder: 'Enter their address',
}

const LANDLORD_EMAIL: Field = {
  name: 'LANDLORD_EMAIL',
  type: FIELD_TYPES.TEXT,
  rules: [rules.isTruthy],
  prompt: 'Email',
  placeholder: 'Enter their email address',
}

const LANDLORD_PHONE: Field = {
  name: 'LANDLORD_PHONE',
  type: FIELD_TYPES.TEXT,
  prompt: 'Phone',
  rules: [],
  placeholder: 'Enter their phone number',
}

const LANDLORD_CONTACT_DETAILS: Field = {
  name: 'LANDLORD_CONTACT_DETAILS',
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
  rules: [rules.isTruthy],
  type: FIELD_TYPES.TEXT,
  placeholder: 'Enter their full name',
}

const AGENT_COMPANY: Field = {
  name: 'AGENT_COMPANY',
  prompt: 'Company',
  rules: [rules.isTruthy],
  type: FIELD_TYPES.TEXT,
  placeholder: "Enter the name of the agent's company",
}

const AGENT_ADDRESS: Field = {
  name: 'AGENT_ADDRESS',
  prompt: 'Address',
  rules: [],
  type: FIELD_TYPES.TEXT,
  placeholder: 'Enter their address',
}

const AGENT_EMAIL: Field = {
  name: 'AGENT_EMAIL',
  type: FIELD_TYPES.TEXT,
  rules: [rules.isTruthy],
  prompt: 'Email',
  placeholder: 'Enter their email address',
}

const AGENT_PHONE: Field = {
  name: 'AGENT_PHONE',
  type: FIELD_TYPES.TEXT,
  prompt: 'Phone',
  rules: [],
  placeholder: 'Enter their phone number',
}

const AGENT_CONTACT_DETAILS: Field = {
  name: 'AGENT_CONTACT_DETAILS',
  prompt: "Please provide the contact details of your landlord's agent.",
  help:
    "We don't need all of your agent's details. If you don't have some of this information, you can leave the fields blank.",
  type: FIELD_TYPES.FIELD_GROUP,
  when: Conditions.HAS_AGENT,
  rules: [],
  fields: [AGENT_NAME, AGENT_COMPANY, AGENT_ADDRESS, AGENT_EMAIL, AGENT_PHONE],
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
