// @flow
import type { Section } from 'types'

import * as Forms from './forms'

export const SECTIONS: Array<Section> = [
  {
    name: 'Your rental issue',
    forms: [Forms.DEFECT, Forms.HAS_QUOTE, Forms.QUOTE_COST],
  },
  {
    name: 'Your landlord',
    forms: [
      Forms.LANDLORD_COMMS_CHECK,
      Forms.LANDLORD_COMMS_DETAILS,
      Forms.LANDLORD_DETAILS,
      Forms.VCAT_AVOID_REASON,
    ],
  },
  {
    name: 'Your details',
    forms: [Forms.PERSONAL_DETAILS, Forms.PERSONAL_PREFERENCES],
  },
]
