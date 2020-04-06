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
    { label: 'Reduced income', value: 'Reduced income' },
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

const ISSUE_PHOTO: Field = {
  name: 'ISSUE_PHOTO',
  prompt: 'Please upload a photo of any evidence of how you have been affected',
  help:
    'For example, if you have lost your job and have received a letter of termination, please upload the a photo letter of termination. Providing evidence will increase your chance of obtaining a rent reduction.',
  type: FIELD_TYPES.FILE,
  rules: [],
}

const IS_JOB_SEEKER_BENEFITS: Field = {
  rules: [rules.isTruthy],
  name: 'IS_JOB_SEEKER_BENEFITS',
  prompt: 'Will you be receiving Job Keeper or Job Seeker benefits?',
  type: FIELD_TYPES.RADIO_BTN,
  rules: [rules.isTruthy],
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
    { label: "I'm not sure", value: 'not sure' },
  ],
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

const NOTICE_TO_VACATE_PHOTO: Field = {
  name: 'NOTICE_TO_VACATE_PHOTO',
  when: Conditions.HAS_NOTICE_TO_VACATE,
  prompt: 'Please upload a photo of the Notice to Vacate',
  type: FIELD_TYPES.FILE,
  rules: [],
}

export const ISSUE: Form = {
  name: 'ISSUE',
  prompt: 'Tell us about your problem.',
  fields: [
    ISSUE_TYPE,
    ISSUE_DESCRIPTION,
    ISSUE_PHOTO,
    IS_JOB_SEEKER_BENEFITS,
    ISSUE_EVICTION,
    NOTICE_TO_VACATE_PHOTO,
  ],
}
