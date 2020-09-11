// @flow
import type { Data } from 'types'

export const HAS_OTHER_SPECIAL_CIRCUMSTANCE = (data: Data) =>
  data['CLIENT_SPECIAL_CIRCUMSTANCES'] &&
  data['CLIENT_SPECIAL_CIRCUMSTANCES'].includes('other')

export const WAS_REFERRED_CHARITY = (data: Data) =>
  data['CLIENT_REFERRAL'] == 'Charity'

export const WAS_REFERRED_LEGAL_CENTRE = (data: Data) =>
  data['CLIENT_REFERRAL'] == 'Legal centre'

export const WAS_REFERRED_OTHER = (data: Data) =>
  data['CLIENT_REFERRAL'] == 'Other'
