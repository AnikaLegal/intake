import PropTypes from 'prop-types'

import { FIELD_TYPES } from 'consts'

export const FieldShape = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)).isRequired,
  prompt: PropTypes.string,
  placeholder: PropTypes.string,
  help: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  valid: PropTypes.bool,
  errors: PropTypes.array,
}

export const FormShape = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape(FieldShape)).isRequired,
  prompt: PropTypes.string,
  help: PropTypes.string,
  section: PropTypes.string,
  when: PropTypes.func,
  validations: PropTypes.object.isRequired,
}

import {
  DEFECT_FORM,
  HAS_QUOTE_FORM,
  QUOTE_COST_FORM,
  LANDLORD_COMMS_CHECK_FORM,
  LANDLORD_COMMS_DETAILS_FORM,
  LANDLORD_DETAILS_FORM,
  VCAT_AVOID_REASON_FORM,
  PERSONAL_DETAILS_FORM,
  PERSONAL_PREFERENCES_FORM,
} from './fields'

export const SECTIONS = [
  {
    name: 'Your rental issue',
    forms: [
      DEFECT_FORM,
      // HAS_QUOTE_FORM, QUOTE_COST_FORM
    ],
  },
  // {
  //   name: 'Your landlord',
  //   forms: [
  //     LANDLORD_COMMS_CHECK_FORM,
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
