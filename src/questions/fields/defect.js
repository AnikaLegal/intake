// @flow
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'
import type { Field, Form } from 'types'

export const DEFECT_TYPE: Field = {
  name: 'DEFECT_TYPE',
  prompt: 'What does the problem relate to?',
  placeholder: 'Select the type of problem that needs to be repaired.',
  help: "If none apply, please select 'other'",
  type: FIELD_TYPES.DROPDOWN,
  rules: [rules.isTruthy],
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

export const DEFECT_DESCRIPTION: Field = {
  name: 'DEFECT_DESCRIPTION',
  prompt: 'Please provide a short description of the problem',
  placeholder: 'Describe the problem here',
  type: FIELD_TYPES.TEXTAREA,
  rules: [rules.isTruthy],
}

export const DEFECT_PHOTO: Field = {
  name: 'DEFECT_PHOTO',
  prompt:
    'If you have a photo of the problem, please upload it (as it will help us to assist you)',
  help:
    'If you do not have a photo of the problem to upload, that’s completely okay',
  type: FIELD_TYPES.FILE,
  rules: [],
}
