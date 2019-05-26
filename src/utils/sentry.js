// @flow
import * as Sentry from '@sentry/browser'

if (SENTRY_JS_DSN) {
  // Sentry wants this run as early as possible (ie. pre-render), but this is fine for now.
  Sentry.init({ dsn: SENTRY_JS_DSN })
}

export const logError = (error: any, info: any) => {
  console.error('Caught an error:', error, info)
  if (SENTRY_JS_DSN) {
    console.log('Sending error report to Sentry.')
    // Report error to Sentry
    Sentry.withScope(scope => {
      Object.keys(info).forEach(key => {
        scope.setExtra(key, info[key])
      })
      Sentry.captureException(error)
    })
  }
}
