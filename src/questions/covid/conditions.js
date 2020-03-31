// @flow
import type { Data } from 'types'

export const HAS_NOTICE_TO_VACATE = (data: Data) =>
  data['ISSUE_EVICTION'] == 'yes'

export const HAS_AGENT = (data: Data) => data['LANDLORD_HAS_AGENT'] === 'yes'

export const NOT_HAS_AGENT = (data: Data) =>
  data['LANDLORD_HAS_AGENT'] !== 'yes'

export const HAS_OTHER_SPECIAL_CIRCUMSTANCE = (data: Data) =>
  data['CLIENT_SPECIAL_CIRCUMSTANCES'] &&
  data['CLIENT_SPECIAL_CIRCUMSTANCES'].includes('other')

export const WAS_REFERRED_CHARITY = (data: Data) =>
  data['CLIENT_REFERRAL'] == 'Charity'

export const WAS_REFERRED_LEGAL_CENTRE = (data: Data) =>
  data['CLIENT_REFERRAL'] == 'Legal centre'

export const WAS_REFERRED_OTHER = (data: Data) =>
  data['CLIENT_REFERRAL'] == 'Other'
