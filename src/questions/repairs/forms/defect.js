//@flow
// Form where we collect tenancy defect details.
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'

import * as Conditions from '../conditions'
import type { Field, Form } from 'types'

const DEFECT_TYPE: Field = {
  name: 'DEFECT_TYPE',
  prompt: 'What does the problem relate to?',
  placeholder: 'Select the type of problem that needs to be repaired.',
  help:
    "You can select more than one problem. If none apply, please select 'Other'",
  type: FIELD_TYPES.MULTI_DROPDOWN,
  rules: [rules.isTruthyArray],
  options: [
    { label: 'Toilet', value: 'Toilet' },
    { label: 'Water', value: 'Water' },
    { label: 'Electricity', value: 'Electricity' },
    { label: 'Cooking', value: 'Cooking' },
    { label: 'Fire', value: 'Fire' },
    { label: 'Stairs or lift', value: 'Stairs or lift' },
    { label: 'Laundry', value: 'Laundry' },
    { label: 'Gas', value: 'Gas' },
    { label: 'Roof', value: 'Roof' },
    { label: 'Heating or cooling', value: 'Heating or cooling' },
    { label: 'Other', value: 'Other' },
  ],
}

const DEFECT_DESCRIPTION: Field = {
  name: 'DEFECT_DESCRIPTION',
  prompt: 'Please provide a short description of the problem(s)',
  placeholder: 'Describe the problem here',
  type: FIELD_TYPES.TEXTAREA,
  rules: [rules.isTruthy],
}

const DEFECT_DATE: Field = {
  rules: [rules.isTruthy],
  name: 'DEFECT_DATE',
  prompt: 'When did the problem arise?',
  help:
    "If you don't know the exact date, that's okay. An approximate date is fine.",
  type: FIELD_TYPES.DATE,
}

const DEFECT_PHOTO: Field = {
  name: 'DEFECT_PHOTO',
  prompt: 'If you have any photos of the problem(s), please upload them',
  help:
    'If you do not have any photos of the problem(s) to upload, that’s completely okay',
  type: FIELD_TYPES.FILE,
  rules: [],
}

export const DEFECT: Form = {
  name: 'DEFECT',
  prompt: "What's wrong?",
  fields: [DEFECT_TYPE, DEFECT_DESCRIPTION, DEFECT_DATE, DEFECT_PHOTO],
}
