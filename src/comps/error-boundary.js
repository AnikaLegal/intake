// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import type { Node } from 'react'
import { Text } from 'design'

import { logError } from 'utils'

type Props = {
  children: Node,
  noRender?: boolean,
}

type State = {
  hasError: boolean,
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: any) {
    this.setState({ hasError: true })
    logError(error)
  }

  render() {
    const { hasError } = this.state
    const { noRender, children } = this.props
    if (hasError) {
      if (noRender) {
        return null
      }
      return (
        <Error>
          <Text.Header>Something broke 😠</Text.Header>
          <Text.Body>
            Try refreshing the page. If it's still broken, let us know at
            contact@anikalegal.com
          </Text.Body>
        </Error>
      )
    }
    return children
  }
}

const Error = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`
