// @flow
import React from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, ROUTES, LINKS } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'

export const IneligibleRepairsAppliedVCATView = () => {
  useScrollTop()
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.PAPER_GUY} />
      <Splash.Content>
        <Text.Header splash>
          Our Repairs service focusses on helping renters write a formal
          compliance request to their real estate agent and/or rental provider,
          and our service scope ends once a Repairs Order has been obtained.
          Based on what you've told us, you have already obtained a Repairs
          Order.
        </Text.Header>
        <Text.Body splash>Would you still like to continue?</Text.Body>
        <Splash.ButtonGroup>
          <a href={ROUTES.INELIGIBLE_REPAIRS_GOTTEN_VCAT}>
            <Splash.Button>Yes</Splash.Button>
          </a>
          <a href={ROUTES.INELIGIBLE_REPAIRS_VCAT_STAGE}>
            <Splash.Button last>No</Splash.Button>
          </a>
        </Splash.ButtonGroup>
      </Splash.Content>
    </Splash.Container>
  )
}
