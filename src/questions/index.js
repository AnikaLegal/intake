// @flow
import { FIELD_TYPES } from 'consts'
import type { Section } from 'types'

import {
  DEFECT_FORM,
  HAS_QUOTE_FORM,
  QUOTE_COST_FORM,
  LANDLORD_COMMS_CHECK_FORM,
  LANDLORD_COMMS_EXIT,
  LANDLORD_COMMS_DETAILS_FORM,
  LANDLORD_DETAILS_FORM,
  VCAT_AVOID_REASON_FORM,
  PERSONAL_DETAILS_FORM,
  PERSONAL_PREFERENCES_FORM,
} from './fields'

export const SECTIONS: Array<Section> = [
  {
    name: 'Your rental issue',
    forms: [DEFECT_FORM], //, HAS_QUOTE_FORM, QUOTE_COST_FORM],
  },
  // {
  //   name: 'Your landlord',
  //   forms: [
  //     LANDLORD_COMMS_CHECK_FORM,
  //     LANDLORD_COMMS_EXIT,
  //     LANDLORD_COMMS_DETAILS_FORM,
  //     LANDLORD_DETAILS_FORM,
  //     VCAT_AVOID_REASON_FORM,
  //   ],
  // },
  // {
  //   name: 'Your details',
  //   forms: [PERSONAL_DETAILS_FORM, PERSONAL_PREFERENCES_FORM],
  // },
]
