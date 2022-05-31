// Page for when we need to shutdown intake due to high demand
// @flow
import React from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, LINKS } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'

export const ClosedView = () => {
  useScrollTop()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
      <Splash.Content>
        <Text.Header splash>
          Anika Legal is not currently taking new cases.
        </Text.Header>
        <Text.Body splash>
          <p>
            Due to high demand for our services, we have had to limit our
            support to existing clients. We're sorry for the inconvenience.
          </p>
          <p>
            If you'd like us to contact you when we are taking new cases, please
            follow the link below and provide your email address.
          </p>
        </Text.Body>
        <Splash.ButtonGroup>
          <a href={LINKS.CLOSED_CONTACT}>
            <Splash.Button last>Contact me</Splash.Button>
          </a>
        </Splash.ButtonGroup>
      </Splash.Content>
    </Splash.Container>
  )
}

const SplashButton = styled(BigButton)`
  margin-top: 50px;
`
