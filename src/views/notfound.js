import React, { Component } from 'react'
import { Container, Header, Icon } from 'semantic-ui-react'

class NotFoundView extends Component {
  render() {
    return (
      <Header as="h2" icon textAlign="center" style={{ paddingTop: '3rem' }}>
        <Icon name="map signs" style={{ marginBottom: '1.5rem' }} />
        <Header.Content>Page not found</Header.Content>
      </Header>
    )
  }
}

export { NotFoundView }
