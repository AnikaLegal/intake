// @flow
export * from './querystring'
export * from './debounce'
export * from './functional'
export * from './sentry'
export * from './format'

export const timeout = (ms: number) =>
  new Promise<void>((r) => setTimeout(r, ms))
