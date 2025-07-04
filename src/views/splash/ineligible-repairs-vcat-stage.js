// @flow
import React from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, LINKS } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'
import type { Field, Data } from 'types'

export const IneligibleRepairsVCATStageView = () => {
  useScrollTop()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
      <Splash.Content>
        <Text.Header splash>
          We are sorry we cannot represent you at VCAT.
        </Text.Header>
        <Text.Body splash>
          You may wish to contact your local community legal centres who will be
          better placed to look into your matter. Follow the link below to see
          what is available in your area.
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
