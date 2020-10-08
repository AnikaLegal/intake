// @flow
import type { Client } from 'types'

export * from './querystring'
export * from './debounce'
export * from './functional'
export * from './sentry'
export * from './format'
export * from './form-navigation'
export * from './scroll-hook'

export const timeout = (ms: number) =>
  new Promise<void>((r) => setTimeout(r, ms))
