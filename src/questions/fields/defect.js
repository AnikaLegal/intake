import { FIELD_TYPES } from 'consts'

export const DEFECT_TYPE = {
  name: 'DEFECT_TYPE',
  prompt: 'What does the defect relate to?',
  help: 'If none apply, please select \'other\'',
  type: FIELD_TYPES.MULTICHOICE,
  options: [
    'Toilet',
    'Water',
    'Electricity',
    'Cooking',
    'Fire',
    'Stairs / lift',
    'Laundry',
    'Gas',
    'Roof',
    'Heating / cooling',
    'Other',
  ],
}

export const DEFECT_PHOTO = {
  name: 'DEFECT_PHOTO',
  prompt: 'If you have a photo of the defect, please upload it (as it will help us to assist you)',
  help: 'If you do not have a photo of the defect to upload, that’s completely okay',
  type: FIELD_TYPES.FILE,
}

export const DEFECT_DESCRIPTION = {
  name: 'DEFECT_DESCRIPTION',
  prompt: 'Please provide a short description of the defect',
  help: 'Just explain it as if you were telling a friend about it',
  type: FIELD_TYPES.TEXTAREA,
}
