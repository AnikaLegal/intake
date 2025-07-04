// @flow
import React from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, LINKS } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'

export const IneligibleNoNoticeView = () => {
  useScrollTop()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
      <Splash.Content>
        <Text.Header splash>
          Unfortunately we are currently only able to help when your landlord or
          real estate agent has begun the evictions process by sending you a
          Notice to Vacate. If that happens, please come back and let us know.
        </Text.Header>
        <Text.Body>
          For more information about the evictions process, please see the <a
            href={LINKS.EVICTIONS_AND_POSSESSION_ORDERS_INFO}> Consumer Affairs
            Victoria Website</a>.
        </Text.Body>
      </Splash.Content>
    </Splash.Container>
  )
}

const SplashButton = styled(BigButton)`
  margin-top: 50px;
`
