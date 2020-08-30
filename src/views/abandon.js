// @flow
import React from 'react'
import { Hero, Text, BigButton } from 'design'
import { IMAGES } from 'consts'
import styled from 'styled-components'

export const AbandonView = () => (
  <Hero.Container left>
    <Hero.Image src={IMAGES.HEROES.PHONE_LADY} />
    <Hero.Content>
      <LogoEl src={IMAGES.LOGO.TEXT.COLOR.SVG} />
      <Text.Header>
        Welcome to the Anika Legal rental support questonnaire.
      </Text.Header>
      <Text.Body>
        We’re here to help you with your rental problem. In order for us to
        start your case, we need to ask you a series of simple questions. This
        questionnaire takes approximately 10 minutes to complete.
      </Text.Body>

      <HeroButton primary>Let’s get started</HeroButton>
    </Hero.Content>
  </Hero.Container>
)

const HeroButton = styled(BigButton)`
  margin-top: 50px;
`

const LogoEl = styled.img`
  height: 122px;
  margin-bottom: 39px;
`
