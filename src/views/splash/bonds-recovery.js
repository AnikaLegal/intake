// @flow
import React from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, LINKS } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'

export const BondsRecoveryView = () => {
  useScrollTop()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
      <Splash.Content>
        <Text.Header splash>
          Our Bonds Recovery service focusses on helping you navigate the bond
          recovery process once you are confirmed to leave the property. If you
          have general questions about your bond while you are still in the
          property, please have a look at our blog articles:
        </Text.Header>
        NEED TO LIST THE BLOG ARTICLES HERE
        <ul>
          <li>
            <a target="_blank" href="#">
              BLOG ARTICLE 1
            </a>
          </li>
        </ul>
        <Splash.ButtonGroup>
          <a href={LINKS.HOME}>
            <Splash.Button last>Return home</Splash.Button>
          </a>
        </Splash.ButtonGroup>
      </Splash.Content>
    </Splash.Container>
  )
}

const SplashButton = styled(BigButton)`
  margin-top: 50px;
`
