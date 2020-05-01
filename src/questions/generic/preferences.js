//@flow
// Form where we collect client preferences data.
import { FIELD_TYPES } from 'consts'
import { rules } from 'utils'

import type { Field } from 'types'

export const CLIENT_CALL_TIME: Field = {
  rules: [rules.isTruthy],
  name: 'CLIENT_CALL_TIME',
  displayName: 'When you want us to call you',
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
