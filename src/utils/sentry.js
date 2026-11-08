// @flow
import * as Sentry from '@sentry/browser'

if (SENTRY_JS_DSN) {
  // Initialize Sentry, if it is enabled.
  Sentry.init({
    dsn: SENTRY_JS_DSN,
    release: SENTRY_RELEASE,
    environment: SENTRY_ENV,
    // Console output can hold client details, so don't send it to Sentry
    // as breadcrumbs.
    integrations: [Sentry.breadcrumbsIntegration({ console: false })],
  })
}

type LogOptions = {
  level?: 'error' | 'warning',
  extra?: { [string]: mixed },
}

export const logException = (error: any, options?: LogOptions) => {
  console.error('Caught an error:', error)
  if (SENTRY_JS_DSN) {
    // Send error report to Sentry, if it is enabled.
    console.log('Sending error report to Sentry.')
    Sentry.captureException(error, options)
  }
}
