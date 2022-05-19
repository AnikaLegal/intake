// @flow
import React from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, ROUTES, LINKS } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'

export const AssessCircumstancesView = () => {
  useScrollTop()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.SHRUB_GUY} />
      <Splash.Content>
        <Text.Header splash>
          So that we can assess your circumstances holistically, please tell
          us if you have any other special circumstances that you would like us
          to consider.
        </Text.Header>
        <Splash.ButtonGroup>
          <a href={ROUTES.INELIGIBLE_MEANS}>
            <Splash.Button>Yes</Splash.Button>
          </a>
          <a href={ROUTES.INELIGIBLE_MEANS}>
            <Splash.Button last>No</Splash.Button>
          </a>
        </Splash.ButtonGroup>
      </Splash.Content>
    </Splash.Container>
  )
}
