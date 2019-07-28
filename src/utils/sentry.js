// @flow
import * as Sentry from '@sentry/browser'

if (SENTRY_JS_DSN) {
  Sentry.init({ dsn: SENTRY_JS_DSN, environment: SENTRY_ENV })
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
