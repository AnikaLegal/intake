// @flow
import React from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, LINKS } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'

export const IneligibleEvictedView = () => {
  useScrollTop()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
      <Splash.Content>
        <Text.Header splash>
          Unfortunately our evictions service is focused on helping renters
          resist eviction by negotiating a payment plan. We are unable to assist
          if you have already been evicted from the property.
        </Text.Header>
        {/* <Text.Body splash>
          You may wish to contact your local community legal centres who may be
          better placed to look into your matter. We have arranged for their
          contact details to be sent to your email separately. This should
          arrive in the next 2 - 3 business days.
        </Text.Body> */}
        {/* FOR THE ABOVE WE ARE AWAITING FOR REFERRAL PATHWAY PROCESS */}
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
