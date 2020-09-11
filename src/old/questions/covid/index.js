// @flow
import type { Section } from 'types'

import * as Forms from './forms'

import { SURVEY, PERSONAL_DETAILS } from 'questions/generic'

export const COVID_SECTIONS: Array<Section> = [
  {
    name: 'Your details',
    forms: [PERSONAL_DETAILS, Forms.TENANCY_DETAILS],
  },
  {
    name: "What's wrong?",
    forms: [Forms.ISSUE],
  },
  {
    name: 'Your landlord',
    forms: [Forms.LANDLORD_CONTACT],
  },
  {
    name: 'Your preferences',
    forms: [Forms.PERSONAL_PREFERENCES, SURVEY],
  },
]
