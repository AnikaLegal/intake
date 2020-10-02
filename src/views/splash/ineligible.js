// @flow
import React from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, LINKS } from 'consts'
import styled from 'styled-components'

export const IneligibleView = () => (
  <Splash.Container left>
    <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
    <Splash.Content>
      <Text.Header splash>
        Unfortunately we are currently only able to help with rental issues in
        Victoria.
      </Text.Header>
      <Text.Body>
        If you wish to enquire further you can call our support staff on 0451
        618 383 between 9am to 5pm during weekdays, or you can email us at
        contact@anikalegal.com
      </Text.Body>
      <Splash.ButtonGroup>
        <a href={LINKS.HOME}>
          <Splash.Button last>Return home</Splash.Button>
        </a>
      </Splash.ButtonGroup>
    </Splash.Content>
  </Splash.Container>
)

const SplashButton = styled(BigButton)`
  margin-top: 50px;
`
