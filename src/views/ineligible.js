// @flow
import React from 'react'
import { Hero, Text, BigButton } from 'design'
import { IMAGES } from 'consts'
import styled from 'styled-components'

export const IneligibleView = () => (
  <Hero.Container left>
    <Hero.Image src={IMAGES.HEROES.SHRUB_GUY} />
    <Hero.Content>
      <Text.Header>
        Unfortunately we are currently only able to help with rental issues in
        Victoria.
      </Text.Header>
      <Text.Body>
        If you wish to enquire further you can call our support staff on 0451
        618 383 between 9am to 5pm during weekdays, or you can email us at
        contact@anikalegal.com
      </Text.Body>

      <HeroButton primary>Contact us</HeroButton>
      <HeroButton>Return home</HeroButton>
    </Hero.Content>
  </Hero.Container>
)

const HeroButton = styled(BigButton)`
  margin-top: 50px;
`
