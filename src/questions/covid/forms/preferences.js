//@flow
// Form where we collect client preferences data.
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'

import * as Conditions from '../conditions'
import type { Field, Form } from 'types'

const CLIENT_CALL_TIME: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_CALL_TIME',
  prompt: 'When is your preferred time for us to call you?',
  help:
    'One of our friendly team members will call you to introduce themselves and to discuss how we can help you.',
  type: FIELD_TYPES.MULTI_SELECT,
  options: [
    {
      label: 'Monday – Friday (between 9am and 5pm)',
      value: 'Monday – Friday (between 9am and 5pm)',
    },
    {
      label: 'Monday – Friday (between 5pm and 8pm)',
      value: 'Monday – Friday (between 5pm and 8pm)',
    },
    {
      label: 'Saturday (between 9am and 5pm)',
      value: 'Saturday (between 9am and 5pm)',
    },
    {
      label: 'Sunday (between 9am and 5pm)',
      value: 'Sunday (between 9am and 5pm)',
    },
  ],
}

export const PERSONAL_PREFERENCES: Form = {
  name: 'PERSONAL_PREFERENCES',
  prompt: 'Tell us what you prefer',
  fields: [CLIENT_CALL_TIME],
}
