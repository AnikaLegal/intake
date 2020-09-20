// @flow
import { FIELD_TYPES } from 'consts'

import { TextField } from './text'
import { DisplayField } from './display'
import { EmailField } from './email'
import { ChoiceSingleField } from './choice-single'
import { ChoiceMultiField } from './choice-multi'
import { DateField } from './date'
import { UploadField } from './upload'

export const FORM_FIELDS = {
  [FIELD_TYPES.DISPLAY]: DisplayField,
  [FIELD_TYPES.TEXT]: TextField,
  [FIELD_TYPES.EMAIL]: EmailField,
  [FIELD_TYPES.CHOICE_SINGLE]: ChoiceSingleField,
  [FIELD_TYPES.CHOICE_MULTI]: ChoiceMultiField,
  [FIELD_TYPES.DATE]: DateField,
  [FIELD_TYPES.UPLOAD]: UploadField,
}