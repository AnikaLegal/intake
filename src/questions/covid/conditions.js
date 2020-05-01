// @flow
import type { Data } from 'types'

export const HAS_NOTICE_TO_VACATE = (data: Data) =>
  data['ISSUE_EVICTION'] == 'yes'

export const HAS_AGENT = (data: Data) => data['LANDLORD_HAS_AGENT'] === 'yes'

export const NOT_HAS_AGENT = (data: Data) =>
  data['LANDLORD_HAS_AGENT'] !== 'yes'
