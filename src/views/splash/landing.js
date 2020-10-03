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
      <Text.Header splash>
        Welcome to the Anika Legal rental support questionnaire.
      </Text.Header>
      <Text.Body splash>
        We’re here to help you with your rental problem. In order for us to
        start your case, we need to ask you a series of simple questions. This
        questionnaire takes approximately 10 minutes to complete.
      </Text.Body>
      <Splash.ButtonGroup>
        <Link to={ROUTES.build(ROUTES.CLIENT_FORM, { ':qIdx': 0 }, {})}>
          <Splash.Button last primary>
            Let’s get started
          </Splash.Button>
        </Link>
      </Splash.ButtonGroup>
    </Splash.Content>
    <Splash.Image src={IMAGES.HEROES.PHONE_LADY} />
  </Splash.Container>
)

const LogoEl = styled.img`
  height: 122px;
  margin-bottom: 39px;
  @media (max-width: ${theme.screen.mobile}) {
    display: none;
  }
`
