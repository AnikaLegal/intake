// @flow
import React from 'react'
import { Splash, Text, BigButton, theme } from 'design'
import { Link } from 'react-router-dom'
import { IMAGES, ROUTES } from 'consts'
import styled from 'styled-components'

export const LandingView = () => (
  <Splash.Container>
    <Splash.Content>
      <LogoEl src={IMAGES.LOGO.TEXT.COLOR.SVG} />
      <Text.Header>
        Welcome to the Anika Legal rental support questonnaire.
      </Text.Header>
      <Text.Body>
        We’re here to help you with your rental problem. In order for us to
        start your case, we need to ask you a series of simple questions. This
        questionnaire takes approximately 10 minutes to complete.
      </Text.Body>
      <Link to={ROUTES.build(ROUTES.CLIENT_FORM, { ':qIdx': 0 }, {})}>
        <SplashButton primary>Let’s get started</SplashButton>
      </Link>
    </Splash.Content>
    <Splash.Image src={IMAGES.HEROES.PHONE_LADY} />
  </Splash.Container>
)

const SplashButton = styled(BigButton)`
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
