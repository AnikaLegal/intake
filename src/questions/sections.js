// @flow
import type { Section } from 'types'

import * as Forms from './forms'

export const SECTIONS: Array<Section> = [
  {
    name: 'Your rental issue',
    forms: [Forms.DEFECT, Forms.HAS_QUOTE],
  },
  {
    name: 'Your landlord',
    forms: [
      Forms.LANDLORD_COMMS_CHECK,
      Forms.LANDLORD_COMMS_DETAILS,
      Forms.LANDLORD_CONTACT,
    ],
  },
  {
    name: 'Your details',
    forms: [Forms.PERSONAL_DETAILS],
  },
  {
    name: 'Your preferences',
    forms: [Forms.PERSONAL_PREFERENCES],
  },
]
