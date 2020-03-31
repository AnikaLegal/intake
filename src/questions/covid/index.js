// @flow
import type { Section } from 'types'

import * as Forms from './forms'

export const COVID_SECTIONS: Array<Section> = [
  {
    name: 'Your details',
    forms: [Forms.PERSONAL_DETAILS, Forms.TENANCY_DETAILS],
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
    forms: [Forms.PERSONAL_PREFERENCES],
  },
  {
    name: 'We want to understand out clients better',
    forms: [Forms.SURVEY],
  },
]
