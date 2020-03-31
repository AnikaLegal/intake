//@flow
// Form where we collect tenancy ISSUE details.
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'

import * as Conditions from '../conditions'
import type { Field, Form } from 'types'

const ISSUE_TYPE: Field = {
  name: 'ISSUE_TYPE',
  prompt: 'How have you been affected by COVID-19?',
  placeholder: 'Select the type of problem.',
  help:
    "You can select more than one problem. If none apply, please select 'Other'",
  type: FIELD_TYPES.MULTI_DROPDOWN,
  rules: [rules.isTruthyArray],
  options: [
    { label: 'Unable to work', value: 'Unable to work' },
    { label: 'Emotional distress', value: 'Emotional distress' },
    {
      label: 'Another tenant has moved out',
      value: 'Another tenant has moved out',
    },
    { label: 'Other', value: 'Other' },
  ],
}

const ISSUE_DESCRIPTION: Field = {
  name: 'ISSUE_DESCRIPTION',
  prompt: 'Please provide a short description of how you have been affected.',
  placeholder: 'Describe how you have been affected here',
  type: FIELD_TYPES.TEXTAREA,
  rules: [rules.isTruthy],
}

const ISSUE_EVICTION: Field = {
  rules: [rules.isTruthy],
  name: 'ISSUE_EVICTION',
  prompt:
    'Has the landlord tried to evict you by providing you with a Notice to Vacate?',
  type: FIELD_TYPES.RADIO_BTN,
  rules: [rules.isTruthy],
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ],
}

const ISSUE_PHOTO: Field = {
  name: 'ISSUE_PHOTO',
  when: Conditions.HAS_NOTICE_TO_VACATE,
  prompt: 'Please upload a photo of the Notice to Vacate',
  type: FIELD_TYPES.FILE,
  rules: [],
}

export const ISSUE: Form = {
  name: 'ISSUE',
  prompt: 'Tell us about your problem.',
  fields: [ISSUE_TYPE, ISSUE_DESCRIPTION, ISSUE_EVICTION, ISSUE_PHOTO],
}
