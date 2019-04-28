import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/browser'

import styles from 'styles/generic/error-boundary.module.scss'

if (SENTRY_JS_DSN) {
  // Sentry wants this run as early as possible (ie. pre-render), but this is fine for now.
  Sentry.init({ dsn: SENTRY_JS_DSN })
}

export class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    noRender: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    console.error(error, info)
    this.setState({ hasError: true })
    if (SENTRY_JS_DSN) {
      logger.log('Sending error report to Sentry.')
      // Report error to Sentry
      Sentry.withScope(scope => {
        Object.keys(info).forEach(key => {
          scope.setExtra(key, info[key])
        })
        Sentry.captureException(error)
      })
    }
  }

  render() {
    const { hasError } = this.state
    const { noRender, children } = this.props
    if (hasError) {
      if (noRender) {
        return null
      }
      return (
        <div className={styles.error}>
          <h2>Something broke 😠</h2>
        </div>
      )
    }
    return children
  }
}
