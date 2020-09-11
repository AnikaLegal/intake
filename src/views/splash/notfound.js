// @flow
import React from 'react'
import { Splash, Text } from 'design'
import { IMAGES } from 'consts'
import styled from 'styled-components'

export const NotFoundView = () => (
  <Splash.Container left>
    <Splash.Image src={IMAGES.HEROES.PAPER_GUY} />
    <Splash.Content>
      <Text.Header>Page not found</Text.Header>
      <Text.Body>We couldn't find this page for you. Sorry!</Text.Body>
    </Splash.Content>
  </Splash.Container>
)
