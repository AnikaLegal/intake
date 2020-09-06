// @flow
import React from 'react'
import { Hero, Text, BigButton, theme } from 'design'
import { Link } from 'react-router-dom'
import { IMAGES, ROUTES } from 'consts'
import styled from 'styled-components'

export const LandingView = () => (
  <Hero.Container>
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
      <Link to={ROUTES.INTAKE_START}>
        <HeroButton primary>Let’s get started</HeroButton>
      </Link>
    </Hero.Content>
    <Hero.Image src={IMAGES.HEROES.PHONE_LADY} />
  </Hero.Container>
)

const HeroButton = styled(BigButton)`
  margin-top: 50px;
  @media (max-width: ${theme.screen.mobile}) {
    margin-top: 20px;
  }
  @media (max-width: ${theme.screen.small}) {
    margin-top: 7px;
  }
`

const LogoEl = styled.img`
  height: 122px;
  padding-top: 6vh;
  margin-bottom: 39px;
  @media (max-width: ${theme.screen.mobile}) {
    display: none;
  }
`
