// @flow
import React from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, LINKS } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'

export const IneligibleAlreadyRemovedView = () => {
  useScrollTop()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
      <Splash.Content>
        <Text.Header splash>
          Unfortunately, we are unable to assist if you have already been
          evicted from the property.
        </Text.Header>
        <Text.Body splash>
          For legal help, follow the link below to see what is available in your area.
        </Text.Body>
        <Splash.ButtonGroup>
          <a href={LINKS.VIC_LEGAL_AID}>
            <Splash.Button>Legal centres</Splash.Button>
          </a>
        </Splash.ButtonGroup>
      </Splash.Content>
    </Splash.Container>
  )
}

const SplashButton = styled(BigButton)`
  margin-top: 50px;
`
