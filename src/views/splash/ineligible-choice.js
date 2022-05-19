// @flow
import React from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, ROUTES, LINKS } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'

export const IneligibleChoiceView = () => {
  useScrollTop()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.PAPER_GUY} />
      <Splash.Content>
        <Text.Header splash>
          It looks like you're not eligible for our service. If you continue
          with our intake form, we cannot guarantee that we can assist you.
          Would you still like to continue?
        </Text.Header>
        <Splash.ButtonGroup>
          <a href={ROUTES.ASSESS_CIRCUMSTANCES}>
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
