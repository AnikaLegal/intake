//@flow
// Form where we collect repairs quote details.
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'

import * as Conditions from '../conditions'
import type { Field, Form } from 'types'

const HAS_QUOTE_BOOL: Field = {
  name: 'HAS_QUOTE',
  prompt:
    'Have you obtained  a quote (i.e. an estimate) for the cost of the repairs to fix the problem(s)?',
  help:
    'You can get a quote by contacting a tradesperson, getting them to inspect the problem(s) and asking how much it would cost to fix it.',
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

const QUOTE_COST: Field = {
  name: 'QUOTE_COST',
  prompt: 'What was the quote for the cost of the repairs?',
  when: Conditions.HAS_QUOTE,
  type: FIELD_TYPES.DOLLAR,
  placeholder: 'Enter the quoted amount',
  rules: [rules.isTruthy],
}

export const HAS_QUOTE: Form = {
  name: 'HAS_QUOTE',
  prompt: 'Repair quote',
  fields: [HAS_QUOTE_BOOL, QUOTE_COST],
}
