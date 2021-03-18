// @flow
import React, { useEffect } from 'react'
import { Splash, Text, BigButton } from 'design'
import { IMAGES, LINKS } from 'consts'
import styled from 'styled-components'
import { useScrollTop } from 'utils'

const CLIENT_KEY = 'clientId'

export const SubmittedView = () => {
  useScrollTop()
  useEffect(() => {
    localStorage.setItem(CLIENT_KEY, '')
  })
  return (
    <Splash.Container left>
      <Splash.Image src={IMAGES.HEROES.PAPER_GUY} />
      <Splash.Content>
        <Text.Header splash>
          <strong>Success!</strong> Your case has been submitted.
        </Text.Header>
        <Text.Body splash>
          Our paralegals will contact you within the next two business days to
          discuss how we can help you.
        </Text.Body>
        <Splash.ButtonGroup>
          <a href={LINKS.HOME}>
            <Splash.Button primary last>
              Return home
            </Splash.Button>
          </a>
        </Splash.ButtonGroup>
      </Splash.Content>
    </Splash.Container>
  )
}
