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
          Our Bonds Recovery service focusses on helping you negotiate a
          settlement with your landlord once they have applied to VCAT to claim
          your bond held at the RTBA.
        </Text.Header>
        Due to resource constraints, we are currently unable to assist with bond
        issues where you have general questions about bonds prior to leaving the
        property, the bond is not held by the RTBA, your dispute is with a
        co-tenant, or if your landlord hasn't applied to VCAT yet. Depending on
        your situation, you may wish to have a look at our Bonds resources:
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
