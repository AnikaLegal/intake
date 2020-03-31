//@flow
// Form where we collect client personal details.
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'

import * as Conditions from '../conditions'
import type { Field, Form } from 'types'

const CLIENT_IS_TENANT: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_IS_TENANT',
  prompt: 'Are you named as a tenant on the lease?',
  help: "It's likely that you are named as a tenant if you signed the lease.",
  type: FIELD_TYPES.RADIO_BTN,
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ],
}
const TENANCY_START_DATE: Field = {
  rules: [rules.isTruthy],
  name: 'TENANCY_START_DATE',
  prompt: 'When did you start living at the rental property?',
  help:
    "If you don't know the exact date, that's okay. An approximate date is fine.",
  type: FIELD_TYPES.DATE,
}

export const TENANCY_DETAILS: Form = {
  name: 'TENANCY_DETAILS',
  prompt: 'Your tenancy details',
  fields: [TENANCY_START_DATE, CLIENT_IS_TENANT],
}
