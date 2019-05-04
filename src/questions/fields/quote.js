import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'

const HAS_QUOTE = {
  name: 'HAS_QUOTE',
  prompt:
    'Have you obtained  a quote (i.e. an estimate) for the cost of the repairs to fix the defect?',
  help: 'It doesn’t matter if you haven’t obtained a quote yet.',
  type: FIELD_TYPES.MULTICHOICE,
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

const QUOTE_COST = {
  name: 'QUOTE_COST',
  prompt: 'What was the quote for the cost of the repairs to fix the defect?',
  type: FIELD_TYPES.DOLLAR,
}

const CAN_PAY_QUOTE = {
  name: 'CAN_PAY_QUOTE',
  prompt:
    'Do you have the money (and would you be willing) to pay for the repairs yourself and then seek reimbursement from your landlord?',
  help:
    'Paying for the repairs yourself (and then seeking reimbursement from your landlord) is the fastest way to get the defect fixed. However, we expect that most tenants will not wish to pay for the repairs themselves.',
  type: FIELD_TYPES.MULTICHOICE,
  options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
}

export const HAS_QUOTE_FORM = {
  name: 'HAS_QUOTE_FORM',
  prompt: 'Repair quote',
  fields: [HAS_QUOTE],
  validations: {
    HAS_QUOTE: [rules.isTruthy],
  },
}

export const QUOTE_COST_FORM = {
  name: 'QUOTE_COST_FORM',
  when: data => data['HAS_QUOTE'] === 'yes',
  prompt: 'Repair quote',
  fields: [QUOTE_COST, CAN_PAY_QUOTE],
  validations: {
    QUOTE_COST: [rules.isTruthy],
    CAN_PAY_QUOTE: [rules.isTruthy],
  },
}
