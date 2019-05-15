// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/browser'
import type { Node } from 'react'
// @noflow
import styles from 'styles/generic/error-boundary.module.scss'

if (SENTRY_JS_DSN) {
  // Sentry wants this run as early as possible (ie. pre-render), but this is fine for now.
  Sentry.init({ dsn: SENTRY_JS_DSN })
}

type Props = {
  children: Node,
  noRender?: boolean,
}

type State = {
  hasError: boolean,
}

export class ErrorBoundary extends Component<Props, State> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    noRender: PropTypes.bool,
  }

  state = { hasError: false }

  componentDidCatch = (error: any, info: any) => {
    console.error(error, info)
    this.setState({ hasError: true })
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
