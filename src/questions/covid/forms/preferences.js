//@flow
// Form where we collect client preferences data.
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'

import * as Conditions from '../conditions'
import type { Field, Form } from 'types'

import { CLIENT_CALL_TIME } from 'questions/generic'

export const PERSONAL_PREFERENCES: Form = {
  name: 'PERSONAL_PREFERENCES',
  prompt: 'Tell us what you prefer',
  fields: [CLIENT_CALL_TIME],
}
