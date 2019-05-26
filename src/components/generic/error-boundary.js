// @flow
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import type { Node } from 'react'

import { logError } from 'utils'

// @noflow
import styles from 'styles/generic/error-boundary.module.scss'

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
    this.setState({ hasError: true })
    logError(error, info)
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
