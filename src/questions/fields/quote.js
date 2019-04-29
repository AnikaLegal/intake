import { FIELD_TYPES } from 'consts'

export const HAS_QUOTE = {
  name: 'HAS_QUOTE',
  prompt: 'Have you obtained  a quote (i.e. an estimate) for the cost of the repairs to fix the defect?',
  help: 'It doesn’t matter if you haven’t obtained a quote yet.',
  type: FIELD_TYPES.MULTICHOICE,
  options: [
    'Yes, I have obtained a quote.',
    'No, I have not obtained a quote.',
  ]
}

export const QUOTE_COST = {
  name: 'QUOTE_COST',
  prompt: 'What was the quote for the cost of the repairs to fix the defect?',
  type: FIELD_TYPES.NUMBER,
}

export const CAN_PAY_QUOTE = {
  name: 'CAN_PAY_QUOTE',
  prompt: 'Do you have the money (and would you be willing) to pay for the repairs yourself and then seek reimbursement from your landlord?',
  help: 'Paying for the repairs yourself (and then seeking reimbursement from your landlord) is the fastest way to get the defect fixed. However, we expect that most tenants will not wish to pay for the repairs themselves.',
  type: FIELD_TYPES.MULTICHOICE,
  options: [
    'Yes',
    'No',
  ],
}
