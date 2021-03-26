// @flow
import React from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, LINKS } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'

export const IneligibleView = () => {
  useScrollTop()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
      <Splash.Content>
        <Text.Header splash>
          Unfortunately we are currently only able to help with the following
          rental issues in Victoria, Australia:
        </Text.Header>
        <Text.Body splash>
          <ul>
            <li>
              <a target="_blank" href={LINKS.EVICTION_INFO}>
                Evictions
              </a>{' '}
              for unpaid rent
            </li>
            <li>
              <a target="_blank" href={LINKS.REPAIRS_INFO}>
                Rental repairs
              </a>{' '}
              in your home
            </li>
          </ul>
          If you wish to enquire further you can email us at
          contact@anikalegal.com
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
