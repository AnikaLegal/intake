// @flow
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'
import type { Field, Form } from 'types'

export const HAS_QUOTE: Field = {
  name: 'HAS_QUOTE',
  prompt:
    'Have you obtained  a quote (i.e. an estimate) for the cost of the repairs to fix the defect?',
  help: 'It doesn’t matter if you haven’t obtained a quote yet.',
  type: FIELD_TYPES.RADIO,
  rules: [rules.isTruthy],
  options: [
    {
      label: 'Yes, I have obtained a quote.',
      value: 'yes',
    },
    {
      label: 'No, I have not obtained a quote.',
      value: 'no',
    },
  ],
}

export const QUOTE_COST: Field = {
  name: 'QUOTE_COST',
  prompt: 'What was the quote for the cost of the repairs to fix the defect?',
  type: FIELD_TYPES.DOLLAR,
  rules: [rules.isTruthy],
}

export const CAN_PAY_QUOTE: Field = {
  name: 'CAN_PAY_QUOTE',
  prompt:
    'Do you have the money (and would you be willing) to pay for the repairs yourself and then seek reimbursement from your landlord?',
  help:
    'Paying for the repairs yourself (and then seeking reimbursement from your landlord) is the fastest way to get the defect fixed. However, we expect that most tenants will not wish to pay for the repairs themselves.',
  type: FIELD_TYPES.RADIO_BTN,
  rules: [rules.isTruthy],
  options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
}
