// @flow
import React from 'react'
import { Splash, Text, BigButton, theme } from 'design'
import { IMAGES } from 'consts'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

export const NotFoundView = () => {
  const history = useHistory()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.PAPER_GUY} />
      <Splash.Content>
        <Text.Header>Page not found</Text.Header>
        <Text.Body>We couldn't find this page for you. Sorry!</Text.Body>
        <SplashButton className="top" primary onClick={() => history.goBack()}>
          Go back
        </SplashButton>
      </Splash.Content>
    </Splash.Container>
  )
}

const SplashButton = styled(BigButton)`
  margin-top: 50px;
  @media (max-width: ${theme.screen.mobile}) {
    margin-top: 20px;
  }
  @media (max-width: ${theme.screen.small}) {
    margin-top: 7px;
  }
`
