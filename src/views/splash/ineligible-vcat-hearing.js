// @flow
import React from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, LINKS } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'

export const IneligibleVcatHearingView = () => {
  useScrollTop()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
      <Splash.Content>
        <Text.Header splash>
          Unfortunately our evictions service is not an urgent advice service.
          We do not have capacity to assist you in time for your next VCAT
          hearing.
        </Text.Header>
        <Text.Body splash>
          We suggest you contact <a
          href="https://www.legalaid.vic.gov.au/node/11560">Victoria Legal Aid's Legal
          Help</a> for advice.
        </Text.Body>
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
