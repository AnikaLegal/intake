// @flow
import React from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'

export const NoEmailView = () => {
  useScrollTop()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
      <Splash.Content>
        <Text.Header splash>
          Anika Legal is an online service, with the majority of communication
          and advice sent via email.
        </Text.Header>
        <Text.Body splash>
          If you don't have an email address, please complete the form below and
          we'll call you to see if we're able to help. If not then we'll be able
          to direct you to another organisation.
        </Text.Body>
        <Text.Body splash>*INSERT FORM HERE*</Text.Body>{' '}
        {/* Need to insert form here (Can be found in Clerk but need to convert to React) */}
      </Splash.Content>
    </Splash.Container>
  )
}

const SplashButton = styled(BigButton)`
  margin-top: 50px;
`
