// @flow
import React from 'react'
import { Splash, Text, BigButton, theme } from 'design'
import { Link } from 'react-router-dom'
import { IMAGES, ROUTES } from 'consts'
import styled from 'styled-components'
import { events } from 'analytics'
import { useScrollTop } from 'utils'
import { LINKS } from 'consts'

export const LandingView = () => {
  useScrollTop()
  return (
    <Splash.Container>
      <Splash.Content>
        <LogoEl src={IMAGES.LOGO.TEXT.COLOR.SVG} />
        <Text.Header splash>
          Welcome to the Anika Legal rental support questionnaire.
        </Text.Header>
        <Text.Body splash>
          We’re here to help you with your rental problem. In order for us to
          help you, we need to ask you a series of simple questions. This
          questionnaire takes approximately 10 minutes to complete.
        </Text.Body>
        <Text.Header splash></Text.Header>
        <Splash.ButtonGroup>
          <Link
            to={ROUTES.build(ROUTES.FORM, { ':qIdx': 0 }, {})}
            onClick={events.onStartIntake}
          >
            <Splash.Button primary>Let’s get started</Splash.Button>
          </Link>
          <a href={LINKS.SERVICES}>
            <Splash.Button last>Learn more</Splash.Button>
          </a>
        </Splash.ButtonGroup>
      </Splash.Content>
      <Splash.Image src={IMAGES.HEROES.PHONE_LADY} />
    </Splash.Container>
  )
}

// Used for warning messages for stuff like Christmas closures.
const WarningBody = styled(Text.Body)`
  background-color: #ffe1a6;
  color: ${theme.color.grey.dark};
  font-size: 14px;
  line-height: 1.4;
  padding: 1rem;
  border-radius: 10px;
  & > strong {
    color: #d72207;
  }
`

const LogoEl = styled.img`
  height: 122px;
  margin-bottom: 39px;
  @media (max-width: ${theme.screen.mobile}) {
    display: none;
  }
`
