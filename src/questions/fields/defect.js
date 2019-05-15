// @flow
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'
import type { Field, Form } from 'types'

export const DEFECT_TYPE: Field = {
  name: 'DEFECT_TYPE',
  prompt: 'What does the defect relate to?',
  placeholder: 'Select the type of defect',
  help: "If none apply, please select 'other'",
  type: FIELD_TYPES.DROPDOWN,
  options: [
    { label: 'Toilet', value: 'Toilet' },
    { label: 'Water', value: 'Water' },
    { label: 'Electricity', value: 'Electricity' },
    { label: 'Cooking', value: 'Cooking' },
    { label: 'Fire', value: 'Fire' },
    { label: 'Stairs / lift', value: 'Stairs / lift' },
    { label: 'Laundry', value: 'Laundry' },
    { label: 'Gas', value: 'Gas' },
    { label: 'Roof', value: 'Roof' },
    { label: 'Heating / cooling', value: 'Heating / cooling' },
    { label: 'Other', value: 'Other' },
  ],
}

export const DEFECT_DESCRIPTION: Field = {
  name: 'DEFECT_DESCRIPTION',
  prompt: 'Please provide a short description of the defect',
  placeholder: 'Enter your description here',
  help: 'Just explain it as if you were telling a friend about it',
  type: FIELD_TYPES.TEXTAREA,
}

export const DEFECT_PHOTO: Field = {
  name: 'DEFECT_PHOTO',
  prompt:
    'If you have a photo of the defect, please upload it (as it will help us to assist you)',
  help:
    'If you do not have a photo of the defect to upload, that’s completely okay',
  type: FIELD_TYPES.FILE,
}

export const DEFECT_FORM: Form = {
  name: 'DEFECT_FORM',
  prompt: 'Tell us about your rental issue',
  fields: [DEFECT_TYPE, DEFECT_DESCRIPTION, DEFECT_PHOTO],
  validations: {
    DEFECT_TYPE: [rules.isTruthy],
    DEFECT_DESCRIPTION: [rules.isTruthy],
    DEFECT_PHOTO: [],
  },
}
