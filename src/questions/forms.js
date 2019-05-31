// @flow
import { rules } from 'utils'
import { FIELD_TYPES } from 'consts'
import { VIEWS } from 'routes'
import * as Fields from './fields'
import type { Form } from 'types'

export const DEFECT: Form = {
  name: 'DEFECT',
  prompt: 'Tell us about your rental issue',
  fields: [Fields.DEFECT_TYPE, Fields.DEFECT_DESCRIPTION, Fields.DEFECT_PHOTO],
  rules: {},
}

export const HAS_QUOTE: Form = {
  name: 'HAS_QUOTE',
  prompt: 'Repair quote',
  fields: [Fields.HAS_QUOTE],
  rules: {},
}

export const QUOTE_COST: Form = {
  name: 'QUOTE_COST',
  when: data => data['HAS_QUOTE'] === 'yes',
  prompt: 'Repair quote',
  fields: [Fields.QUOTE_COST, Fields.CAN_PAY_QUOTE],
  rules: {},
}

export const LANDLORD_COMMS_CHECK: Form = {
  name: 'LANDLORD_COMMS_CHECK',
  prompt: 'Tell us about your landlord',
  fields: [Fields.HAS_CONTACTED_LANDLORD],
  rules: {},
  getRedirect: data =>
    data['HAS_CONTACTED_LANDLORD'] === 'no' ? 'ContactLandlordView' : null,
}

export const LANDLORD_COMMS_DETAILS: Form = {
  name: 'LANDLORD_COMMS_DETAILS',
  prompt: 'Tell us about your landlord',
  fields: [
    Fields.LANDLORD_CONTACT_METHOD,
    Fields.LANDLORD_CONTACT_DATE,
    Fields.LANDLORD_CONTACT_ATTEMPTS,
    Fields.LANDLORD_CONTACT_RECORDS,
  ],
  rules: {},
}

export const LANDLORD_DETAILS: Form = {
  name: 'LANDLORD_DETAILS',
  prompt: 'Tell us about your landlord',
  fields: [
    Fields.LANDLORD_HAS_AGENT,
    Fields.LANDLORD_CONTACT_DETAILS,
    Fields.IS_VCAT_OK,
  ],
  rules: {},
}

export const VCAT_AVOID_REASON: Form = {
  name: 'VCAT_AVOID_REASON',
  when: data => data['IS_VCAT_OK'] === 'no',
  prompt: 'Tell us more',
  fields: [Fields.VCAT_AVOID_REASON],
  rules: {},
}

export const PERSONAL_DETAILS: Form = {
  name: 'PERSONAL_DETAILS',
  prompt: 'We need to know more about you',
  fields: [Fields.CLIENT_CONTACT_DETAILS],
  rules: {},
}

export const PERSONAL_PREFERENCES: Form = {
  name: 'PERSONAL_PREFERENCES',
  prompt: 'Tell us what you prefer',
  fields: [
    Fields.LETTER_PERMISSION,
    Fields.CLIENT_CONTACT_METHOD,
    Fields.CLIENT_REFERRAL,
  ],
  rules: {},
}
