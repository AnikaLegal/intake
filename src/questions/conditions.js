// @flow
import type { Data } from 'types'
export const HAS_QUOTE = (data: Data) => data['HAS_QUOTE'] === 'yes'
export const HAS_AGENT = (data: Data) => data['LANDLORD_HAS_AGENT'] === 'yes'
export const VCAT_NOT_OK = (data: Data) => data['IS_VCAT_OK'] === 'no'
