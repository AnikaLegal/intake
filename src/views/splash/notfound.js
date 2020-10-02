// @flow
import React from 'react'
import { Splash, Text, theme } from 'design'
import { IMAGES } from 'consts'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

export const NotFoundView = () => {
  const history = useHistory()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.PAPER_GUY} />
      <Splash.Content>
        <Text.Header splash>Page not found</Text.Header>
        <Text.Body>We couldn't find this page for you. Sorry!</Text.Body>
        <Splash.ButtonGroup>
          <Splash.Button primary last onClick={() => history.goBack()}>
            Go back
          </Splash.Button>
        </Splash.ButtonGroup>
      </Splash.Content>
    </Splash.Container>
  )
}
