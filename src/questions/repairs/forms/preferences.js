//@flow
// Form where we collect client preferences data.
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'

import * as Conditions from '../conditions'
import type { Field, Form } from 'types'

const CAN_PAY_QUOTE: Field = {
  name: 'CAN_PAY_QUOTE',
  prompt:
    'Would you be willing to pay for the repairs yourself and then claim reimbursment from the landlord?',
  help:
    'Paying for the repairs yourself and then claiming reimbursement from your landlord is the fastest way to get the problem fixed. However, we understand that many tenants do not want to pay for the repairs themselves.',
  type: FIELD_TYPES.RADIO_BTN,
  rules: [rules.isTruthy],
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ],
}

const IS_VCAT_OK: Field = {
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

const VCAT_AVOID_REASON: Field = {
  name: 'VCAT_AVOID_REASON',
  rules: [rules.isTruthy],
  when: Conditions.VCAT_NOT_OK,
  prompt:
    'Can you please explain why you would prefer not to bring a case against your landlord at VCAT?',
  type: FIELD_TYPES.TEXTAREA,
}

const LETTER_ASSERTS_PROCEEDINGS_RIGHT: Field = {
  rules: [rules.isTruthy],
  name: 'LETTER_ASSERTS_PROCEEDINGS_RIGHT',
  prompt:
    'If a letter needs to be sent to your landlord, would you like the letter to say you have the right to commence legal proceedings against your landlord?',
  help:
    'If the letter says you have the right to commence legal proceedings, it will place more pressure on the landlord to perform the repairs quickly. If the letter does not say you have the right to commence legal proceedings against your landlord, it will be a more “gentle” letter.',

  type: FIELD_TYPES.RADIO_BTN,
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

const CLIENT_BREACHED_LEASE: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_BREACHED_LEASE',
  prompt: 'Have you recently breached your lease?',
  help:
    'Breaches may include not paying rent on time or sub-letting the premises to a friend without your landlord’s consent. We will keep your answer strictly confidential and won’t tell your landlord. Telling us this information will help us to determine the most appropriate course of action for you to take.',
  type: FIELD_TYPES.RADIO_BTN,
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ],
}

const CLIENT_CALL_TIME: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_CALL_TIME',
  prompt: 'When is your preferred time for us to call you?',
  help:
    'One of our friendly team members will call you to introduce themselves and to discuss how we can help you.',
  type: FIELD_TYPES.MULTI_SELECT,
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

export const PERSONAL_PREFERENCES: Form = {
  name: 'PERSONAL_PREFERENCES',
  prompt: 'Tell us what you prefer',
  fields: [
    CAN_PAY_QUOTE,
    IS_VCAT_OK,
    VCAT_AVOID_REASON,
    LETTER_ASSERTS_PROCEEDINGS_RIGHT,
    CLIENT_BREACHED_LEASE,
    CLIENT_CALL_TIME,
  ],
}
